import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy,  OnInit} from '@angular/core';

@Component({
  selector: 'senph-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  fillerNav: Array<{path: string, title: any}> = [
    {
      path: 'phenomena', 
      title: 'All phenomena'},
    {
      path: 'sensors',
      title: 'All sensors'},
    {
      path: 'devices',
      title: 'All devices'},
    {
      path: 'domains',
      title: 'All domains'}
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

}
