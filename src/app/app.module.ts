import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { PhenomenaComponent } from './phenomena/phenomena.component';
import { SensorsComponent } from './sensors/sensors.component';
import { DevicesComponent } from './devices/devices.component';
import { PhenomenaDetailComponent } from './phenomena-detail/phenomena-detail.component';
// import { PhenomenaFormComponent } from './phenomena-form/phenomena-form.component';
import { HttpClientModule } from '@angular/common/http';
import { SensorsDetailComponent } from './sensors-detail/sensors-detail.component';
import { DevicesDetailComponent } from './devices-detail/devices-detail.component';
// import { SensorsFormComponent } from './sensors-form/sensors-form.component';
import { DevicesFormComponent } from './devices-form/devices-form.component';
import { FormTemplateComponent } from './form-template/form-template.component';
import { DomainsComponent } from './domains/domains.component';
import { DomainsDetailComponent } from './domains-detail/domains-detail.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MaterialModule } from "./material/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { from } from 'rxjs';
import { FiltersComponent } from './filters/filters.component';
import { FormSensorComponent } from './form-sensor/form-sensor.component';
import { FormPhenomenonComponent } from './form-phenomenon/form-phenomenon.component';
import { environment } from '../environments/environment';
import { FormDomainComponent } from './form-domain/form-domain.component';
import { PhenomenaEditComponent } from './phenomena-edit/phenomena-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingpageComponent,
    PhenomenaComponent,
    SensorsComponent,
    DevicesComponent,
    PhenomenaDetailComponent,
    // PhenomenaFormComponent,
    SensorsDetailComponent,
    DevicesDetailComponent,
    // SensorsFormComponent,
    DevicesFormComponent,
    FormTemplateComponent,
    DomainsComponent,
    DomainsDetailComponent,
    FiltersComponent,
    FormSensorComponent,
    FormPhenomenonComponent,
    FormDomainComponent,
    PhenomenaEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
