
export function redirectElement (slug, link) {
  this._routerService.navigate([link, slug]);
}