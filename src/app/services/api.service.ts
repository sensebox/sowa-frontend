import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { IDevice } from "../interfaces/IDevice";
import { IIri } from "../interfaces/IIri";
import { IPhenomenon } from "../interfaces/IPhenomenon";
import { ISensor } from "../interfaces/ISensor";
import { Sensor } from "../phenomenon";
import { IDomain } from "../interfaces/IDomain";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  createHeaders() {
    let headers = new HttpHeaders();
    let token = window.localStorage.getItem("sb_accesstoken");
    if (token) {
      headers = headers.append("Authorization", token);
    }
    headers = headers.append("Content-Type", "application/json");
    return headers;
  }

  APIURL = environment.api_url;

  constructor(private http: HttpClient) {}

  uriExists(iri) {
    return this.http.get(this.APIURL + "/exists/" + iri).pipe(
      map((res: Array<any>) => {
        return res;
      })
    );
  }

  /**--------------Phenomena------------------------ */
  getPhenomena() {
    return this.http.get(this.APIURL + "/phenomena/all");
  }

  getPhenomenaAllLabels() {
    return this.http.get(this.APIURL + "/phenomena/all/labels");
  }

  getPhenomenonHistory(iri) {
    return this.http.get(this.APIURL + "/phenomena/phenomenon-history/" + iri);
  }

  getPhenomenon(iri): Observable<any> {
    return this.http.get(this.APIURL + "/phenomena/phenomenon/" + iri).pipe(
      map((res: Array<any>) => {
        let phenomenon = new IPhenomenon(res);
        // console.log(phenomenon);
        return phenomenon;
      })
    );
  }

  getHistoricPhenomenon(iri): Observable<any> {
    return this.http
      .get(this.APIURL + "/phenomena/historic-phenomenon/" + iri)
      .pipe(
        map((res: Array<any>) => {
          // console.log(res);
          let phenomenon = new IPhenomenon(res);
          // console.log(phenomenon);
          return phenomenon;
        })
      );
  }

  createPhenomenon(phenomenon) {
    return this.http
      .post(this.APIURL + "/phenomena/phenomenon/create", phenomenon, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  editPhenomenon(phenomenon) {
    return this.http
      .post(this.APIURL + "/phenomena/phenomenon/edit", phenomenon, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  deletePhenomenon(phenomenon) {
    return this.http
      .post(this.APIURL + "/phenomena/phenomenon/delete/", phenomenon, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // getPhenomenonForSensor(sensor) {
  //   return this.http.post(this.APIURL + '/phenomenaforsensor/' + sensor, { headers: this.createHeaders()});
  // }

  /**--------------Sensors------------------------ */
  getSensors() {
    return this.http.get(this.APIURL + "/sensors/all");
  }

  getSensorHistory(iri) {
    return this.http.get(this.APIURL + "/sensors/sensor-history/" + iri);
  }

  getSensor(iri): Observable<any> {
    return this.http.get(this.APIURL + "/sensors/sensor/" + iri).pipe(
      map((res: Array<any>) => {
        var I2Sensor = new ISensor(res);
        return I2Sensor;
      })
    );
  }

  getHistoricSensor(iri): Observable<any> {
    return this.http.get(this.APIURL + "/sensors/historic-sensor/" + iri).pipe(
      map((res: Array<any>) => {
        var I2Sensor = new ISensor(res);
        return I2Sensor;
      })
    );
  }

  createSensor(sensor) {
    return this.http
      .post(this.APIURL + "/sensors/sensor/create", sensor, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  editSensor(sensor) {
    return this.http
      .post(this.APIURL + "/sensors/sensor/edit", sensor, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  deleteSensor(sensor) {
    return this.http
      .post(this.APIURL + "/sensors/sensor/delete/", sensor, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  /**--------------Devices------------------------ */
  getDevices() {
    return this.http.get(this.APIURL + "/devices/all");
  }

  getDeviceHistory(iri) {
    return this.http.get(this.APIURL + "/devices/device-history/" + iri);
  }

  getDevice(iri): Observable<any> {
    return this.http.get(this.APIURL + "/devices/device/" + iri).pipe(
      map((res: Array<any>) => {
        let I2Device = new IDevice(res);
        return I2Device;
      })
    );
  }

  getHistoricDevice(iri): Observable<any> {
    return this.http.get(this.APIURL + "/devices/historic-device/" + iri).pipe(
      map((res: Array<any>) => {
        var I2Device = new IDevice(res);
        return I2Device;
      })
    );
  }

  editDevice(device) {
    return this.http
      .post(this.APIURL + "/devices/device/edit", device, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  createDevice(device) {
    return this.http
      .post(this.APIURL + "/devices/device/create", device, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  deleteDevice(device) {
    return this.http
      .post(this.APIURL + "/devices/device/delete/", device, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  /**--------------Domains------------------------ */
  getDomains() {
    return this.http.get(this.APIURL + "/domains/all", {
      headers: this.createHeaders(),
    });
  }

  getDomainHistory(iri) {
    return this.http.get(this.APIURL + "/domains/domain-history/" + iri);
  }

  getDomain(iri): Observable<any> {
    return this.http.get(this.APIURL + "/domains/domain/" + iri).pipe(
      map((res: Array<any>) => {
        let I2Domain = new IDomain(res);
        return I2Domain;
      })
    );
  }

  getHistoricDomain(iri): Observable<any> {
    return this.http.get(this.APIURL + "/domains/historic-domain/" + iri).pipe(
      map((res: Array<any>) => {
        let domain = new IDomain(res);
        return domain;
      })
    );
  }

  editDomain(domain) {
    return this.http
      .post(this.APIURL + "/domains/domain/edit", domain, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  createDomain(domain) {
    return this.http
      .post(this.APIURL + "/domains/domain/create", domain, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  deleteDomain(domain) {
    return this.http
      .post(this.APIURL + "/domains/domain/delete/", domain, {
        headers: this.createHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  /**-------------------Units------------------- */

  getUnits() {
    return this.http.get(this.APIURL + "/units");
  }

  getUnitLabel(iri) {
    return this.http.get(
      this.APIURL + "/unit/http://purl.obolibrary.org/obo/" + iri.uri.slice(31)
    );
  }

  getAllEntities() {
    return this.http.get(this.APIURL + "/all", {
      headers: this.createHeaders(),
    });
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error("Client Side Error: ", errorResponse.error);
    } else {
      console.error("Server Side Error: ", errorResponse);
    }
    return throwError(errorResponse);
  }
}
