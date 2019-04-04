import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy,  OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

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
      title: 'Phenomena'},
    {
      path: 'sensors',
      title: 'Sensors'},
    {
      path: 'devices',
      title: 'Devices'},
    {
      path: 'domains',
      title: 'Domains'}
  ];

  mode = 'push';

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
