import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AbstractControl } from "@angular/forms";
import { ValidatorFn } from "@angular/forms";
import { of } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { ApiService } from "./api.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ValidationServiceService {
  constructor(private api: ApiService) {}

  APIURL = environment.api_url;

  urlValidator = (httpClient: HttpClient) => (c: FormControl) => {
    if (!c || String(c.value).length === 0) {
      return of(null);
    }
    return httpClient
    .get(this.APIURL + "/exists/" + String(c.value))
    .pipe(
      map((exists: Boolean) => {
        return !exists
        ? null : { urlValidator : true}
      })
    )
  };
}
