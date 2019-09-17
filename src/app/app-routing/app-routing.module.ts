import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LandingpageComponent } from '../landingpage/landingpage.component';
import { PhenomenaComponent } from '../phenomena/phenomena.component';
import { SensorsComponent } from '../sensors/sensors.component';
import { DevicesComponent } from '../devices/devices.component';
import { PhenomenaDetailComponent } from '../phenomena-detail/phenomena-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SensorsDetailComponent } from '../sensors-detail/sensors-detail.component';
import { DevicesDetailComponent } from '../devices-detail/devices-detail.component';
import { DevicesFormComponent } from '../devices-form/devices-form.component';
import { DomainsComponent } from '../domains/domains.component';
import { DomainsDetailComponent } from '../domains-detail/domains-detail.component';
import { FormTemplateComponent } from '../form-template/form-template.component';
import { FormPhenomenonComponent } from '../form-phenomenon/form-phenomenon.component';
import { FormSensorComponent } from '../form-sensor/form-sensor.component';
import { FormDomainComponent } from '../form-domain/form-domain.component';
import { PhenomenaEditComponent } from '../phenomena-edit/phenomena-edit.component';
import { SensorEditComponent } from '../sensor-edit/sensor-edit.component';

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
          { path: ':iri', component: PhenomenaDetailComponent },
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
          }
        ]
      }
    ]
  },
  // {
  //   path: 'phenomenonupdate/:iri',
  //   component: PhenomenaFormComponent},
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
          { path: ':iri', component: SensorsDetailComponent },
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
          }
        ]
      }
    ]
  },
  // {
  //   path: 'sensorupdate/:iri',
  //   component: SensorsFormComponent},
  {
    path: 'devices',
    component: DevicesComponent
  },
  // {
  //   path: 'device/:iri', 
  //   component: DevicesDetailComponent},

  {
    path: 'device',
    children: [
      {
        path: '',
        children: [
          { path: ':iri', component: DevicesDetailComponent },
          {
            path: 'edit',
            children: [
              {
                path: '',
                children: [
                  { path: ':id', component: DevicesFormComponent }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  {
    path: 'deviceupdate',
    component: DevicesFormComponent
  },
  {
    path: 'domains',
    component: DomainsComponent
  },
  {
    path: 'domain/:iri',
    component: DomainsDetailComponent
  },
  {
    path: 'form',
    component: FormTemplateComponent
  },
  {
    path: 'phenomenonform',
    component: PhenomenaEditComponent
  },
  {
    path: 'sensorform',
    component: FormSensorComponent
  },
  {
    path: 'domainform',
    component: FormDomainComponent
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
