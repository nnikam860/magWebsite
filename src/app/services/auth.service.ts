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
  constructor(private http: HttpClient, private router: Router) { }

  userlogin(email: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    
    const body = JSON.stringify({ email, password });
    
    return new Observable(observer => {
      this.http.post('http://localhost:3000/api/v1/admin/login', body, { headers, observe: 'response' }).subscribe(
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
  // reloadAdmin(){
  //   if(localStorage.getItem('admin')){
  //     this.isUserLoggedIn.next(true);
  //      this.router.navigate(['/dashboard']);
  //   }
  // }
}