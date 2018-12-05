import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  APIURL = 'http://localhost:3000';

  constructor(private http:HttpClient) { }
  
  getPhenomena() {
    return this.http.get(this.APIURL + '/queries/phenomena');
   }

  getPhenomenon(iri) {
    return this.http.get(this.APIURL + '/queries/phenomenon/' + iri);
   }

  updatePhenomenon(phenomenon){
    return this.http.post(this.APIURL + '/queries/phenomenon/update' , phenomenon);
  }

  getSensors() {
    return this.http.get(this.APIURL + '/queries/phenomena');
  }

  getDevices() {
    return this.http.get(this.APIURL + '/queries/devices');
  }
}
