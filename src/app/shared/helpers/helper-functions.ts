// export function redirectDomain (longURI, link) {
//     this._routerService.navigate([link, longURI.slice('http://sensors.wiki/SENPH#'.length)]);
//   }

export function redirectDomain (slug, link) {
  this._routerService.navigate([link, slug]);
}

export function redirectUnit (slug, link) {
  this._routerService.navigate([link, slug]);
}