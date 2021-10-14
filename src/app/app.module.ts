import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './old-stuff/nav/nav.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { PhenomenaComponent } from './entities/phenomenon/phenomena/phenomena.component';
import { SensorsComponent } from './entities/sensor/sensors/sensors.component';
import { DevicesComponent } from './entities/device/devices/devices.component';
import { PhenomenaDetailComponent } from './entities/phenomenon/phenomena-detail/phenomena-detail.component';
// import { PhenomenaFormComponent } from './phenomena-form/phenomena-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SensorsDetailComponent } from './entities/sensor/sensors-detail/sensors-detail.component';
import { DevicesDetailComponent } from './entities/device/devices-detail/devices-detail.component';
// import { SensorsFormComponent } from './sensors-form/sensors-form.component';
import { DevicesEditComponent } from './entities/device/devices-edit/devices-edit.component';
import { DomainsComponent } from './entities/domain/domains/domains.component';
import { DomainsDetailComponent } from './entities/domain/domains-detail/domains-detail.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MaterialModule } from "./old-stuff/material/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { from } from 'rxjs';
import { environment } from '../environments/environment';
import { DomainEditComponent } from './entities/domain/domain-edit/domain-edit.component';
import { PhenomenaEditComponent } from './entities/phenomenon/phenomena-edit/phenomena-edit.component';
import { SensorEditComponent } from './entities/sensor/sensor-edit/sensor-edit.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { DeviceNewComponent } from './entities/device/device-new/device-new.component';
import { PhenomenonNewComponent } from './entities/phenomenon/phenomenon-new/phenomenon-new.component';
import { DomainNewComponent } from './entities/domain/domain-new/domain-new.component';
import { SensorNewComponent } from './entities/sensor/sensor-new/sensor-new.component';
import { LabelComponent } from './form-components/label/label.component';
import { UnitComponent } from './form-components/unit/unit.component';
import { DomainComponent } from './form-components/domain/domain.component';
import { SensorElementComponent } from './form-components/sensor-element/sensor-element.component';
import { DeviceComponent } from './form-components/device/device.component';
import { TextComponent } from './form-components/text/text.component';
import { NumberComponent } from './form-components/number/number.component';
import { SensorComponent } from './form-components/sensor/sensor.component';
import { PhenomenonComponent } from './form-components/phenomenon/phenomenon.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { FilterOptionsPipePipe } from './pipes/filter-options-pipe.pipe';
import { ValidComponent } from './form-components/valid/valid.component';
import { LoginContainerComponent } from './login/login-container/login-container.component';
import { LoginComponent } from './login/login/login.component';
import { LoginModalComponent } from './login/login-modal/login-modal.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { TokenInterceptor } from './services/interceptors/token-interceptor.service';
import { ErrorLogComponent } from './error-log/error-log/error-log.component';
import { ErrorLogContainerComponent } from './error-log/error-log-container/error-log-container.component';
import { ErrorLogModalComponent } from './error-log/error-log-modal/error-log-modal.component';

import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';

import { LMarkdownEditorModule } from 'ngx-markdown-editor';



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
    DomainsComponent,
    DomainsDetailComponent,
    DomainEditComponent,
    PhenomenaEditComponent,
    SensorEditComponent,
    FooterComponent,
    HeaderComponent,
    HeroBannerComponent,
    DeviceNewComponent,
    PhenomenonNewComponent,
    DomainNewComponent,
    SensorNewComponent,
    LabelComponent,
    UnitComponent,
    DomainComponent,
    SensorElementComponent,
    DeviceComponent,
    TextComponent,
    NumberComponent,
    SensorComponent,
    PhenomenonComponent,
    FilterPipePipe,
    SearchPipePipe,
    FilterOptionsPipePipe,
    ValidComponent,
    LoginContainerComponent,
    LoginComponent,
    LoginModalComponent,
    LoadingComponent,
    ErrorLogComponent,
    ErrorLogContainerComponent,
    ErrorLogModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FileUploadModule,
    LMarkdownEditorModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
