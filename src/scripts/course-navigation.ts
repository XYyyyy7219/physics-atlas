const sections = [...document.querySelectorAll<HTMLElement>('[data-course-chapter]')];
const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-chapter-link]')];
const cards = [...document.querySelectorAll<HTMLAnchorElement>('[data-chapter-card]')];

if (sections.length) {
  const chapterFromHash = () => {
    try { return document.getElementById(decodeURIComponent(location.hash.slice(1)))?.closest<HTMLElement>('[data-course-chapter]')?.id || ''; }
    catch { return ''; }
  };
  // Keep an explicitly selected chapter active even when its scroll destination
  // is clamped by the end of a short page. Manual scrolling resumes the spy.
  let navigatedChapter = chapterFromHash();
  const setCurrent = (id: string) => {
    links.forEach(link => {
      if (link.dataset.chapterLink === id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    cards.forEach(card => card.classList.toggle('is-current', card.dataset.chapterCard === id));
    document.querySelectorAll('[data-course-top]').forEach(link => {
      if (!id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const offset = parseFloat(getComputedStyle(document.documentElement).fontSize) * 9;
    const current = sections.filter(section => section.getBoundingClientRect().top <= offset).at(-1);
    const atEnd = window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    setCurrent(navigatedChapter || (atEnd ? sections.at(-1)!.id : current?.id || ''));
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  const resumeScrollSpy = () => { navigatedChapter = ''; };
  window.addEventListener('wheel', resumeScrollSpy, { passive: true });
  window.addEventListener('touchstart', resumeScrollSpy, { passive: true });
  window.addEventListener('keydown', event => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) resumeScrollSpy();
  });
  window.addEventListener('hashchange', () => {
    navigatedChapter = chapterFromHash();
    setCurrent(navigatedChapter);
  });
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('[data-chapter-link], [data-chapter-card], [data-course-top]');
    if (!link || !(event instanceof MouseEvent) || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const id = link.dataset.chapterLink || link.dataset.chapterCard || '';
    navigatedChapter = id;
    setCurrent(id);
    link.closest('details')?.removeAttribute('open');
    const sidebar = document.querySelector<HTMLElement>('#starlight__sidebar');
    if (sidebar?.matches(':popover-open')) sidebar.hidePopover();
    // Native links handle scrolling and history. Move keyboard focus to the destination.
    if (id) requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
  });
  update();
}
