import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'senph-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  fillerNav: Array<{ topic: string, options: [{ path: string, title: any }, { path: string, title: any }, { path: string, title: any }] }> = [
    {
      topic: 'Phenomena',
      options: [
        {
          path: 'phenomena',
          title: 'All Phenomena'
        },
        {
          path: 'phenomenon/add',
          title: 'Add a phenomenon'
        },
        {
          path: 'phenomenon/edit/:id',
          title: 'Edit a phenomenon'
        }
      ]
    },
    {
      topic: 'Sensors',
      options: [
        {
          path: 'sensors',
          title: 'All sensors'
        },
        {
          path: 'sensor/add',
          title: 'Add a sensor'
        },
        {
          path: 'sensor/edit/:id',
          title: 'Edit a sensor'
        }
      ]
    },
    {
      topic: 'Devices',
      options: [
        {
          path: 'devices',
          title: 'All devices'
        },
        {
          path: 'device/add',
          title: 'Add a device'
        },
        {
          path: 'device/edit/:id',
          title: 'Edit a device'
        }
      ]
    },
    {
      topic: 'Domains',
      options: [
        {
          path: 'domains',
          title: 'All domains'
        },
        {
          path: 'domain/add',
          title: 'Add a domain'
        },
        {
          path: 'domain/edit/:id',
          title: 'Edit a domain'
        }
      ]
    }
  ];

  mode = 'push';

  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

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