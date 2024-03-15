import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private images_url = 'http://localhost:3000/uploads'

  constructor(private http : HttpClient, ) { }
  getMessage(){
    return this.http.get<{ message: string }>('http://localhost:3000/api/message');
  }
  getImageUrl(imageId: string){
    return this.http.get(`${this.images_url}/${imageId}` ,  { responseType: 'blob' });
  }
}

