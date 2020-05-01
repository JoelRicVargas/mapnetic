import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  constructor(
    private router: Router,
     private authService : AuthService
  ) {

  }

  getToken(){
    let token = this.authService.getTokenLocalstorage();
    if(token) return `Bearer ${token}`;
    return token;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = this.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json',
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });


    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => event),
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        if (error.status === 401) {
          if (error.error.success === false) {
            // this.presentToast('Login failed');
          } else {
            this.router.navigate(['/login']);
          }
        }
        return throwError(error);
      }));
  }
}
