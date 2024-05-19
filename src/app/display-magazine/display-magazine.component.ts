import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
  import { ReadMoreComponent } from '../read-more/read-more.component';
  import { HttpClient } from '@angular/common/http';
  import { AuthService } from '../services/auth.service';
  import { Router } from '@angular/router';
  import { MagServiceService } from '../services/mag-service.service';
  import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-display-magazine',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './display-magazine.component.html',
  styleUrls: ['./display-magazine.component.css']
})
export class DisplayMagazineComponent implements OnInit {
  magazine: any;
  magazineId:any;
  readMagazine:any;
  isAdminLoggedIn:boolean=false;
    constructor(
      private magService : MagServiceService,
      private apiServices: ApiServiceService,
      private http: HttpClient,
      private authService: AuthService,
      private router: Router) {}
  
    ngOnInit(): void {
      this.magService.getMagazines().subscribe((data: any) => {
        this.magazine = data.allMagazine;
      });
      this.authService.isUserLoggedIn.subscribe((isUserLoggedIn) => {
        this.isAdminLoggedIn = isUserLoggedIn;
      });
    }
    readMore(magazineID: number) {
      this.magService.getMagazineById(magazineID).subscribe((data: any) => {
        
        this.readMagazine = data.readMoreMagazine
      });
  console.log(this.magazineId);
      this.router.navigate(['/readmore', this.magazineId])
    }
  
    deleteMagazine(magazineID: number) {
      return this.magService.destroyMagazine(magazineID).subscribe((data: any) => {
        this.ngOnInit();
        console.log(magazineID);
      });
      alert('Article deleted successfully!');
    }
  }

