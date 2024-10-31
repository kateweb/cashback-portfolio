export function getQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    aff_sub: urlParams.get('aff_sub'),
    aid: urlParams.get('aid'),
  };
}

export function saveParamsToLocalStorage() {
  const params = getQueryParams();
  if (params.aff_sub) {
    localStorage.setItem('aff_sub', params.aff_sub);
  }
  if (params.aid) {
    localStorage.setItem('aid', params.aid);
  }
}