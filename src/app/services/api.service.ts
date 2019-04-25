import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.post(this.APIURL + '/queries/phenomenon/update' , phenomenon);
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

  getDevice(iri) {
    return this.http.get(this.APIURL + '/queries/device/' + iri);
   }

  updateDevice(device){
    return this.http.post(this.APIURL + '/queries/device/update' , device);
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
 
}
