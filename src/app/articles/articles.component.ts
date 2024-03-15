import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
    message : string | undefined;
    imageUrl: string | undefined

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    this.apiService.getMessage().subscribe(data => {
      this.message = data?.message;
    });
    const imageName = 'file-6ba2c525-01e1-4e3d-903d-71420dab3f28.jpg'; // Replace with the actual image name
    this.apiService.getImageUrl(imageName).subscribe(
      response => {
        if (response instanceof Blob) {
          const reader = new FileReader();
          reader.readAsDataURL(response);
          reader.onloadend = () => {
            this.imageUrl = reader.result as string;
          };
        } else {
          // Create a Blob object from the response data
         // const blob = new Blob([response], { type: 'image/jpeg' });
          const reader = new FileReader();
         // reader.readAsDataURL(blob);
          reader.onloadend = () => {
            this.imageUrl = reader.result as string;
          };
        }
      },
      error => {
        console.error('Error fetching image:', error);
      }
    );
  }
}