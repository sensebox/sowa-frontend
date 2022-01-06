export function redirectDomain (longURI, link) {
    this._routerService.navigate([link, longURI.slice('http://sensor.wiki/SENPH#'.length)]);
  }