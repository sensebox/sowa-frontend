import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/iUser';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {

  // AUTH_API_URL = 'https://api.testing.opensensemap.org/'

  // private user$ : BehaviorSubject<IUser>;
  // private loading$ : BehaviorSubject<boolean>;
  private errorModalOpen$: BehaviorSubject<boolean>;
  private errorMessage$: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    // this.user$ = new BehaviorSubject(null);
    // this.loading$ = new BehaviorSubject(false);
    this.errorModalOpen$ = new BehaviorSubject(false);
    this.errorMessage$ = new BehaviorSubject(null);

    // if(window.localStorage.getItem('sb_refreshtoken'))
    //   this.recoverSession(window.localStorage.getItem('sb_refreshtoken'))
  } 

  // getUser(){
  //   return this.user$.asObservable();
  // }
  // getUserValue(){
  //   return this.user$.getValue();
  // }
  // setUser(user: IUser){
  //   return this.user$.next(user);
  // }

  getErrorModalOpen(){
    return this.errorModalOpen$.asObservable();
  }
  getErrorModalOpenValue(){
    return this.errorModalOpen$.getValue();
  }
  setErrorModalOpen(open: boolean){
    console.log()
    this.setErrorMessage(null);
    return this.errorModalOpen$.next(open);
  }

  // getLoading(){
  //   return this.loading$.asObservable();
  // }
  // getLoadingValue(){
  //   return this.loading$.getValue();
  // }
  // setLoading(loading: boolean){
  //   return this.loading$.next(loading);
  // }

  getErrorMessage(){
    return this.errorMessage$.asObservable();
  }
  getErrorMessageValue(){
    return this.errorMessage$.getValue();
  }
  setErrorMessage(errorMessage: string){
    return this.errorMessage$.next(errorMessage);
  }

  // login(creds){
    // this.loading$.next(true);
    // this.http.post(this.AUTH_API_URL + 'users/sign-in', creds).subscribe((res:any) => {
      // this.user$.next(res.data.user);
      // window.localStorage.setItem('sb_accesstoken', res.token);
      // window.localStorage.setItem('sb_refreshtoken', res.refreshToken);
      // this.loading$.next(false);
      // this.setLoginPageOpen(false);
    // }, err => {
      // this.errorMessage$.next(err.error.message);
      // this.loading$.next(false);
    // });
  // }

  // recoverSession(token){
    // this.http.post(this.AUTH_API_URL + 'users/refresh-auth', {token: token}).subscribe((res:any) => {
      // this.user$.next(res.data.user);
      // window.localStorage.setItem('sb_accesstoken', res.token);
      // window.localStorage.setItem('sb_refreshtoken', res.refreshToken);
      // this.loading$.next(false);
      // this.setLoginPageOpen(false);
    // }, err => {
      // this.errorMessage$.next(err.error.message);
      // this.loading$.next(false);
    // });
  // }

  // logout(){
  //   window.localStorage.removeItem('sb_accesstoken');
  //   window.localStorage.removeItem('sb_refreshtoken');
  //   this.user$.next(undefined);
  // }
}
