export function isRTL(lang: string) {
  return ['ar', 'he', 'fa', 'ur'].includes(lang);
}

export function applyDir(lang: string) {
  const dir = isRTL(lang) ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.setAttribute('dir', dir);
}
