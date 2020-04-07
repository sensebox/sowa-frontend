import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler,HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { AuthService } from './../auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
      null
  );

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler):                   
  Observable<any> {
  return next.handle(request)
    .pipe(catchError((error:HttpErrorResponse) => {
      if (
        request.url.includes("refresh-auth") ||
        request.url.includes("sign-in")
      ) {
        
        if (request.url.includes("refresh-auth")) {
            this.auth.logout();
            //maybe redirect somewhere or open login modal?
        }
        return throwError(error);
      }
      if (error.status !== 403) {
        return throwError(error);
      }

      if (this.refreshTokenInProgress) {
        //TODO: Check if we need something like this
        // return this.refreshTokenSubject
        //   .filter(result => result !== null)
        //   .take(1)
        //   .switchMap(() => next.handle(this.addAuthenticationToken(request)));     
      } else {
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);

        return this.auth
          .refreshAccessToken().pipe(
          switchMap((token: any) => {
            this.refreshTokenInProgress = false;
            this.refreshTokenSubject.next(token);
            return next.handle(this.addAuthenticationToken(request));
          })).pipe(
            catchError((err: any) => {
              this.refreshTokenInProgress = false;

              this.auth.logout();
              return throwError(error);
            })
          );
      }
    }));
  }

  addAuthenticationToken(request) {
    const accessToken = this.auth.getAccessToken();
    if (!accessToken) {
      return request;
    }
  
    return request.clone({
      setHeaders: {
        Authorization: this.auth.getAccessToken()
      }
    });
  }
}

