import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { LandingpageComponent } from '../landingpage/landingpage.component';

import { PhenomenaComponent } from '../entities/phenomenon/phenomena/phenomena.component';
import { SensorsComponent } from '../entities/sensor/sensors/sensors.component';
import { DevicesComponent } from '../entities/device/devices/devices.component';
import { DomainsComponent } from '../entities/domain/domains/domains.component';
import { UnitsComponent } from '../entities/unit/units/units.component';

import { PhenomenaDetailComponent } from '../entities/phenomenon/phenomena-detail/phenomena-detail.component';
import { SensorsDetailComponent } from '../entities/sensor/sensors-detail/sensors-detail.component';
import { DevicesDetailComponent } from '../entities/device/devices-detail/devices-detail.component';
import { DomainsDetailComponent } from '../entities/domain/domains-detail/domains-detail.component';
import { UnitsDetailComponent } from '../entities/unit/units-detail/units-detail.component';


import { PhenomenaEditComponent } from '../entities/phenomenon/phenomena-edit/phenomena-edit.component';
import { SensorEditComponent } from '../entities/sensor/sensor-edit/sensor-edit.component';
import { DevicesEditComponent } from '../entities/device/devices-edit/devices-edit.component';
import { DomainEditComponent } from '../entities/domain/domain-edit/domain-edit.component';
import { UnitEditComponent } from '../entities/unit/unit-edit/unit-edit.component';

import { PhenomenonNewComponent } from '../entities/phenomenon/phenomenon-new/phenomenon-new.component';
import { SensorNewComponent } from '../entities/sensor/sensor-new/sensor-new.component';
import { DeviceNewComponent } from '../entities/device/device-new/device-new.component'
import { DomainNewComponent } from '../entities/domain/domain-new/domain-new.component';
import { UnitNewComponent } from '../entities/unit/unit-new/unit-new.component';

const routes: Routes = [
  {
    path: '',
    component: LandingpageComponent
  },

  {
    path: 'phenomena',
    component: PhenomenaComponent
  },
  {
    path: 'phenomenon',
    children: [
      {
        path: '',
        children: [
          {
            path: 'detail',
            children: [
              {
                path: '',
                children: [
                  { path: ':iri', component: PhenomenaDetailComponent },
                  { path: ':uri/historic/:iri', component:PhenomenaDetailComponent }                  
                ]
              }
            ]
          },
          {
            path: 'edit',
            children: [
              {
                path: '',
                children: [
                  { path: ':id', component: PhenomenaEditComponent }
                ]
              }
            ]
          },
          {
            path: 'add', component: PhenomenonNewComponent
          }
        ]
      }
    ]
  },

  {
    path: 'sensors',
    component: SensorsComponent
  },
  {
    path: 'sensor',
    children: [
      {
        path: '',
        children: [
          {
            path: 'detail',
            children: [
              {
                path: '',
                children: [
                  { path: ':iri', component: SensorsDetailComponent },
                  { path: ':uri/historic/:iri', component: SensorsDetailComponent },                  
                ]
              }
            ]
          },
          {
            path: 'detail-historic',
            children: [
              {
                path: '',
                children: [
                  { path: ':iri', component: SensorsDetailComponent }
                ]
              }
            ]
          },
          {
            path: 'edit',
            children: [
              {
                path: '',
                children: [
                  { path: ':id', component: SensorEditComponent }
                ]
              }
            ]
          },
          {
            path: 'add', component: SensorNewComponent
          }
        ]
      }
    ]
  },
  
  {
    path: 'devices',
    component: DevicesComponent
  },
  {
    path: 'device',
    children: [
      {
        path: '',
        children: [
          {
            path: 'detail',
            children: [
              {
                path: '',
                children: [
                  { path: ':iri', component: DevicesDetailComponent },
                  { path: ':uri/historic/:iri', component:DevicesDetailComponent }                  
                ]
              }
            ]
          },
          {
            path: 'edit',
            children: [
              {
                path: '',
                children: [
                  { path: ':id', component: DevicesEditComponent }
                ]
              }
            ]
          },
          {
            path: 'add', component: DeviceNewComponent
          }
        ]
      }
    ]
  },

  {
    path: 'domains',
    component: DomainsComponent
  },
  {
    path: 'domain',
    children: [
      {
        path: '',
        children: [
          {
            path: 'detail',
            children: [
              {
                path: '',
                children: [
                  { path: ':iri', component: DomainsDetailComponent },
                  { path: ':uri/historic/:iri', component:DomainsDetailComponent }                  

                ]
              }
            ]
          },
          {
            path: 'edit',
            children: [
              {
                path: '',
                children: [
                  { path: ':id', component: DomainEditComponent }
                ]
              }
            ]
          },
          {
            path: 'add', component: DomainNewComponent
          }
        ]
      }
    ]
  },

  {
    path: 'units',
    component: UnitsComponent
  },
  {
    path: 'unit',
    children: [
      {
        path: '',
        children: [
          {
            path: 'detail',
            children: [
              {
                path: '',
                children: [
                  { path: ':iri', component: UnitsDetailComponent },
                  { path: ':uri/historic/:iri', component:UnitsDetailComponent }                  

                ]
              }
            ]
          },
          {
            path: 'edit',
            children: [
              {
                path: '',
                children: [
                  { path: ':id', component: UnitEditComponent }
                ]
              }
            ]
          },
          {
            path: 'add', component: UnitNewComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
