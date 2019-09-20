import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LandingpageComponent } from '../landingpage/landingpage.component';
import { PhenomenaComponent } from '../phenomenon/phenomena/phenomena.component';
import { SensorsComponent } from '../sensor/sensors/sensors.component';
import { DevicesComponent } from '../device/devices/devices.component';
import { PhenomenaDetailComponent } from '../phenomenon/phenomena-detail/phenomena-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SensorsDetailComponent } from '../sensor/sensors-detail/sensors-detail.component';
import { DevicesDetailComponent } from '../device/devices-detail/devices-detail.component';
import { DevicesEditComponent } from '../device/devices-edit/devices-edit.component';
import { DomainsComponent } from '../domain/domains/domains.component';
import { DomainsDetailComponent } from '../domain/domains-detail/domains-detail.component';
import { FormTemplateComponent } from '../old-stuff/form-template/form-template.component';
import { FormPhenomenonComponent } from '../old-stuff/form-phenomenon/form-phenomenon.component';
import { FormSensorComponent } from '../old-stuff/form-sensor/form-sensor.component';
import { DomainEditComponent } from '../domain/domain-edit/domain-edit.component';
import { PhenomenaEditComponent } from '../phenomenon/phenomena-edit/phenomena-edit.component';
import { SensorEditComponent } from '../sensor/sensor-edit/sensor-edit.component';
import { DeviceNewComponent } from '../device/device-new/device-new.component'
import { DomainNewComponent } from '../domain/domain-new/domain-new.component';
import { SensorNewComponent } from '../sensor/sensor-new/sensor-new.component';
import { PhenomenonNewComponent } from '../phenomenon/phenomenon-new/phenomenon-new.component';
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
                  { path: ':iri', component: PhenomenaDetailComponent }
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
                  { path: ':iri', component: DevicesDetailComponent }
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
                  { path: ':iri', component: DomainsDetailComponent }
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
