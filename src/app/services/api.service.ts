import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IDevice } from '../interfaces/IDevice';
import { IIri } from '../interfaces/IIri';





const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 

  APIURL = 'http://localhost:3000';

  constructor(private http:HttpClient) { }
  
  /**--------------Phenomena------------------------ */
  getPhenomena() {
    return this.http.get(this.APIURL + '/queries/phenomena');
   }

  getPhenomenon(iri) {
    return this.http.get(this.APIURL + '/queries/phenomenon/' + iri);
   }

  getPhenomenonIRI(iri) {
    return this.http.get(this.APIURL + '/queries/phenomenonIRI/' + iri);
   }

  updatePhenomenon(phenomenon){
    return this.http.post(this.APIURL + '/queries/phenomenon/update' , phenomenon, httpOptions);
  }

  getPhenomenonForSensor(sensor){
    return this.http.post(this.APIURL + '/phenomenaforsensor/' + sensor, httpOptions);
  }

    /**--------------Sensors------------------------ */
  getSensors() {
    return this.http.get(this.APIURL + '/queries/sensors');
  }

  getSensor(iri) {
    return this.http.get(this.APIURL + '/queries/sensor/' + iri);
   }

   getSensorIRI(iri) {
    return this.http.get(this.APIURL + '/queries/sensorIRI/' + iri);
   }

  updateSensor(sensor){
    return this.http.post(this.APIURL + '/queries/sensor/update' , sensor);
  }


    /**--------------Devices------------------------ */
  getDevices() {
    return this.http.get(this.APIURL + '/queries/devices');
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
      iris: '',
      sensors:[]
    };
    let sensor = {
      sensors: '',
      sensorsLabel: ''
    };
    let label = {
      label: ''
    };

    return this.http.get(this.APIURL + '/queries/device/' + iri).pipe(
      map((res:Array <any>) => {
       res.forEach((element: any) => {
        console.log(element);
        switch (Object.getOwnPropertyNames(element)[0]) {
  
                case "description" : {
                  Object.assign(I2Device, element);
                  break;
                }
    
                case "iri" : {
                  Object.assign(I2Device, element);
                  break;
                }
                
                case "label" : {  
                  I2Device.labels.push(element);
                  break;
                }
               
    
                case "sensors" : {
                  I2Device.sensors.push(element);
                  break;
                }
                
                case "website" : {
                  Object.assign(I2Device, element);
                  break;
                }
                
                case "image" : {
                  Object.assign(I2Device, element);
                  break;
                }
    
                case "contact" : {
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

  updateDevice(device){
    return this.http.post(this.APIURL + '/queries/device/update' , device);
  }

  editDevice(device){
    return this.http.post(this.APIURL + '/queries/device/edit' , device);
  }


    /**--------------Domains------------------------ */
  getDomains() {
    return this.http.get(this.APIURL + '/queries/domains');
   }

  getDomain(iri) {
    return this.http.get(this.APIURL + '/queries/domain/' + iri);
   }

  updateDomain(domain){
    return this.http.post(this.APIURL + '/queries/domain/update' , domain);
  }
  
  private handleError(errorResponse: HttpErrorResponse) {
      if(errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error: ', errorResponse.error);
      } else {
          console.error('Server Side Error: ', errorResponse);
      }

      return throwError('There is a problem with the service ');
  }
}
