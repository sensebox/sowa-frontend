import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LandingpageComponent } from '../landingpage/landingpage.component';
import { PhenomenaComponent } from '../phenomena/phenomena.component';
import { SensorsComponent } from '../sensors/sensors.component';
import { DevicesComponent } from '../devices/devices.component';
import { PhenomenaDetailComponent } from '../phenomena-detail/phenomena-detail.component';
import { PhenomenaFormComponent } from '../phenomena-form/phenomena-form.component';
import { RouterModule, Routes } from '@angular/router';
import { SensorsDetailComponent } from '../sensors-detail/sensors-detail.component';
import { DevicesDetailComponent } from '../devices-detail/devices-detail.component';
import { SensorsFormComponent } from '../sensors-form/sensors-form.component';
import { DevicesFormComponent } from '../devices-form/devices-form.component';
import { DomainsComponent } from '../domains/domains.component';
import { DomainsDetailComponent } from '../domains-detail/domains-detail.component';
import { DomainsFormComponent } from '../domains-form/domains-form.component';
import { FormTemplateComponent } from '../form-template/form-template.component';
import { FormPhenomenonComponent } from '../form-phenomenon/form-phenomenon.component';
import { FormSensorComponent } from '../form-sensor/form-sensor.component';

const routes: Routes = [
  {
    path: '',
    component: LandingpageComponent
  },
  {
    path: 'phenomena', 
    component: PhenomenaComponent},
  {
    path: 'phenomenon/:iri',
    component: PhenomenaDetailComponent},
  {
    path: 'phenomenonupdate/:iri',
    component: PhenomenaFormComponent},
  {
    path: 'sensors',
    component: SensorsComponent},
  {
    path: 'sensor/:iri',
    component: SensorsDetailComponent},
  {
    path: 'sensorupdate/:iri',
    component: SensorsFormComponent},
  {
    path: 'devices',
    component: DevicesComponent},
  {
    path: 'device/:iri', 
    component: DevicesDetailComponent},
  {
    path: 'deviceupdate/:iri', 
    component: DevicesFormComponent},
  {
    path: 'domains',
    component: DomainsComponent},
  {
    path: 'domain/:iri', 
    component: DomainsDetailComponent},
  {
    path: 'domainupdate/:iri', 
    component: DomainsFormComponent},
  {
    path: 'form',
    component: FormTemplateComponent},
  {
    path: 'phenomenonform',
    component: FormPhenomenonComponent},
  {
    path: 'sensorform',
    component: FormSensorComponent}  
];

@NgModule({
  imports: [
    CommonModule,
     RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
