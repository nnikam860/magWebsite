import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private article_url = 'http://localhost:3000/api/v1/article'

  constructor(private http : HttpClient, ) { }
  getArticles(){
    return this.http.get(this.article_url);
  }

  destroyArticle(articleID:number){
    console.log(articleID);
    
    return this.http.delete(`http://localhost:3000/api/v1/article/${articleID}`)
  }

}