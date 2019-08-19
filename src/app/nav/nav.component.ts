import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy,  OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'senph-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss', '../app.component.scss']
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
      title: 'Domains'},
    {
      path: 'form',
      title: 'Add New Device'},
    {
      path: 'deviceupdate',
      title: 'Edit Device'},
      
    {
      path: 'sensorform',
      title: 'Add New Sensor'},
    {
      path: 'phenomenonform',
      title: 'Add New Phenomenon'},
    {
      path: 'domainform',
      title: 'Add New Domain'}
      
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
