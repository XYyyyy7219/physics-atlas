import './course-navigation';

document.querySelectorAll<HTMLElement>('[data-lecture-section]').forEach(section => {
  section.addEventListener('click', event => {
    const choice = (event.target as Element).closest<HTMLButtonElement>('[data-choose-node]');
    if (!choice) return;
    const id = choice.dataset.chooseNode!;
    section.querySelectorAll<HTMLButtonElement>('[data-choose-node]').forEach(button => { const selected=button===choice; button.classList.toggle('is-selected',selected); button.setAttribute('aria-pressed',String(selected)); });
    section.querySelectorAll<HTMLElement>('[data-node-preview]').forEach(preview => { preview.hidden=preview.dataset.nodePreview!==id; });
  });
});
