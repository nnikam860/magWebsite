import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  imageUrls: string[] = [];
  selectedFile: File | undefined;

  constructor(private apiService: ApiServiceService, private http: HttpClient) { }

  ngOnInit() {
    this.fetchImageUrls();
  }

  fetchImageUrls() {
    this.http.get<any>('http://localhost:3000/images')
      .subscribe(response => {
        this.imageUrls = response.imageUrls || [];
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.http.post<any>('http://localhost:3000/uploads', formData)
        .subscribe(response => {
          this.imageUrls.push(response.imageUrl);
          console.log(this.imageUrls);
        });
    }
  }
  
}