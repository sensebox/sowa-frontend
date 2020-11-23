module.exports.redirectDomain =  function(longURI, link) {
    this._routerService.navigate([link, longURI.slice(34)]);
  }