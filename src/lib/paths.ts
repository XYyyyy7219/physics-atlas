/** 所有自定义站内链接均兼容 GitHub Pages 的仓库子路径。 */
export const sitePath = (path = '') =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
