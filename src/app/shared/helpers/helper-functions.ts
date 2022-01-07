export function redirectDomain (longURI, link) {
    this._routerService.navigate([link, longURI.slice('http://sensors.wiki/SENPH#'.length)]);
  }