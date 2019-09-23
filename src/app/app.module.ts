import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavComponent } from './old-stuff/nav/nav.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { PhenomenaComponent } from './phenomenon/phenomena/phenomena.component';
import { SensorsComponent } from './sensor/sensors/sensors.component';
import { DevicesComponent } from './device/devices/devices.component';
import { PhenomenaDetailComponent } from './phenomenon/phenomena-detail/phenomena-detail.component';
// import { PhenomenaFormComponent } from './phenomena-form/phenomena-form.component';
import { HttpClientModule } from '@angular/common/http';
import { SensorsDetailComponent } from './sensor/sensors-detail/sensors-detail.component';
import { DevicesDetailComponent } from './device/devices-detail/devices-detail.component';
// import { SensorsFormComponent } from './sensors-form/sensors-form.component';
import { DevicesEditComponent } from './device/devices-edit/devices-edit.component';
import { FormTemplateComponent } from './old-stuff/form-template/form-template.component';
import { DomainsComponent } from './domain/domains/domains.component';
import { DomainsDetailComponent } from './domain/domains-detail/domains-detail.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MaterialModule } from "./old-stuff/material/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { from } from 'rxjs';
import { FiltersComponent } from './old-stuff/filters/filters.component';
import { FormSensorComponent } from './old-stuff/form-sensor/form-sensor.component';
import { FormPhenomenonComponent } from './old-stuff/form-phenomenon/form-phenomenon.component';
import { environment } from '../environments/environment';
import { DomainEditComponent } from './domain/domain-edit/domain-edit.component';
import { PhenomenaEditComponent } from './phenomenon/phenomena-edit/phenomena-edit.component';
import { SensorEditComponent } from './sensor/sensor-edit/sensor-edit.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { DeviceNewComponent } from './device/device-new/device-new.component';
import { PhenomenonNewComponent } from './phenomenon/phenomenon-new/phenomenon-new.component';
import { DomainNewComponent } from './domain/domain-new/domain-new.component';
import { SensorNewComponent } from './sensor/sensor-new/sensor-new.component';



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
    DevicesEditComponent,
    FormTemplateComponent,
    DomainsComponent,
    DomainsDetailComponent,
    FiltersComponent,
    FormSensorComponent,
    FormPhenomenonComponent,
    DomainEditComponent,
    PhenomenaEditComponent,
    SensorEditComponent,
    FooterComponent,
    HeaderComponent,
    HeroBannerComponent,
    DeviceNewComponent,
    PhenomenonNewComponent,
    DomainNewComponent,
    SensorNewComponent
  ],
  imports: [
    NgbModule,
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
