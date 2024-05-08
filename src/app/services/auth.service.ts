import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // let headers= new HttpHeaders();
  isUserLoggedIn=new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) { }

  userlogin(email: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    
    const body = JSON.stringify({ email, password });
    
    return new Observable(observer => {
      this.http.post('https://api.digitalbusinessreview.com/api/v1/admin/login', body, { headers, observe: 'response' }).subscribe(
        response1 => {
          this.isUserLoggedIn.next(true);
          localStorage.setItem('admin',JSON.stringify(response1.body))      
          this.router.navigate(['/dashboard'])
          console.warn('response1:',response1);
          observer.next(response1);
          observer.complete();
        },
        error => {
          if (error.status === 400) {
            observer.error('Invalid Email or Password');
          } else {
            observer.error('Something Went Wrong');
          }
        }
      );
    });
  }
  logout() {
    this.user.next(null);
    sessionStorage.clear();
    localStorage.clear();
    // sessionStorage.removeItem('userData');
    // sessionStorage.removeItem('cloudCrmIDs');
    // sessionStorage.removeItem('crmIDs');
    // sessionStorage.removeItem('nonCloudcrmIDs');
    // sessionStorage.removeItem('sideMenu');
    // sessionStorage.removeItem('cloudRequestType');
    // localStorage.removeItem('userData');
    // localStorage.removeItem('cloudCrmIDs');
    // localStorage.removeItem('crmIDs');
    // localStorage.removeItem('nonCloudcrmIDs');
    // localStorage.removeItem('sideMenu');
    // localStorage.removeItem('cloudRequestType');
    this.router.navigate(['/']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // reloadAdmin(){
  //   if(localStorage.getItem('admin')){
  //     this.isUserLoggedIn.next(true);
  //      this.router.navigate(['/dashboard']);
  //   }
  // }
}