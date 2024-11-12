import Cookies from 'js-cookie';
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
    Cookies.set('clickId', params.aff_sub, { expires: 30 });
  }
  if (params.aid) {
    Cookies.set('affiliateId', params.aid, { expires: 30 });
  }
}