import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IDevice } from '../interfaces/IDevice';
import { IIri } from '../interfaces/IIri';
import { IPhenomenon } from '../interfaces/IPhenomenon';
import { ISensor } from '../interfaces/ISensor';
import { Sensor } from '../phenomenon';





const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  APIURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**--------------Phenomena------------------------ */
  getPhenomena() {
    return this.http.get(this.APIURL + '/phenomena/all');
  }


  getPhenomenon(iri): Observable<any> {
    return this.http.get(this.APIURL + '/phenomena/phenomenon/' + iri).pipe(
      map((res: Array<any>) => {
        console.log(res);
        let phenomenon = new IPhenomenon(res);
        console.log(phenomenon);
        return phenomenon;
      })
    )
  }


  // getPhenomenon(iri) {
  //   return this.http.get(this.APIURL + '/phenomena/phenomenon/' + iri);
  //  }

  getPhenomenonDEPRECATED(iri) {
    return this.http.get(this.APIURL + '/phenomena/phenomenonDEPRECATED/' + iri);
  }

  updatePhenomenon(phenomenon) {
    return this.http.post(this.APIURL + '/phenomena/phenomenon/update', phenomenon, httpOptions);
  }

  editPhenomenon(phenomenon) {
    return this.http.post(this.APIURL + '/phenomena/phenomenon/edit', phenomenon);
  }

  addPhenomenon(phenomenon) {
    return this.http.post(this.APIURL + '/phenomena/phenomenon/add', phenomenon);
  }

  getPhenomenonForSensor(sensor) {
    return this.http.post(this.APIURL + '/phenomenaforsensor/' + sensor, httpOptions);
  }

  /**--------------Sensors------------------------ */
  getSensors() {
    return this.http.get(this.APIURL + '/sensors/all');
  }

  getSensor(iri): Observable<any> {




    return this.http.get(this.APIURL + '/sensors/sensor/' + iri).pipe(
      map((res: Array<any>) => {
        console.log(res);
        var I2Sensor = new ISensor(res);
        console.log(I2Sensor);
        return I2Sensor;
      }))
  }

  getSensorIRI(iri) {
    return this.http.get(this.APIURL + '/sensors/sensorIRI/' + iri);
  }

  updateSensor(sensor) {
    return this.http.post(this.APIURL + '/sensors/sensor/update', sensor);
  }

  editSensor(sensor) {
    return this.http.post(this.APIURL + '/sensors/sensor/edit', sensor);
  }

  /**--------------Devices------------------------ */
  getDevices() {
    return this.http.get(this.APIURL + '/devices/all');
  }

  getDevice(iri): Observable<any>
  // : Observable<IDevice[]> 
  {
    let I2Device = {
      website: '',
      labels: [],
      image: '',
      description: '',
      contact: '',
      iri: '',
      sensors: []
    };
    let sensor = {
      sensors: '',
      sensorsLabel: ''
    };
    let label = {
      label: ''
    };

    return this.http.get(this.APIURL + '/devices/device/' + iri).pipe(
      map((res: Array<any>) => {
        res.forEach((element: any) => {
          console.log(element);
          switch (Object.getOwnPropertyNames(element)[0]) {

            case "description": {
              Object.assign(I2Device, element);
              break;
            }

            case "iri": {
              Object.assign(I2Device, element);
              break;
            }

            case "label": {
              I2Device.labels.push(element);
              break;
            }


            case "sensors": {
              I2Device.sensors.push(element);
              break;
            }

            case "website": {
              Object.assign(I2Device, element);
              break;
            }

            case "image": {
              Object.assign(I2Device, element);
              break;
            }

            case "contact": {
              Object.assign(I2Device, element);
              break;
            }
            default: {
              console.log("Invalid attribute");
              break;
            }
          }
          // if(Object.getOwnPropertyNames(element)[0] !== "sensors"){
          //   Object.assign(I2Device, element);
          // } else {
          //   I2Device.sensors.push(Object.assign(sensor, element));
          // }
        })
        // console.log(I2Device);
        let device = new IDevice(I2Device);
        console.log(device);
        return device;
        // return <IDevice> I2Device;
        // .pipe(catchError(this.handleError));
      }))
  }

  updateDevice(device) {
    return this.http.post(this.APIURL + '/devices/device/update', device);
  }

  editDevice(device) {
    return this.http.post(this.APIURL + '/devices/device/edit', device);
  }

  addDevice(device) {
    return this.http.post(this.APIURL + '/devices/device/add', device);
  }


  /**--------------Domains------------------------ */
  getDomains() {
    return this.http.get(this.APIURL + '/domains/all');
  }

  getDomain(iri) {
    return this.http.get(this.APIURL + '/domains/domain/' + iri);
  }

  updateDomain(domain) {
    return this.http.post(this.APIURL + '/domains/domain/update', domain);
  }

  getUnits() {
    return this.http.get(this.APIURL + '/units');
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return throwError('There is a problem with the service ');
  }
}
