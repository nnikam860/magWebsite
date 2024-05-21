import { Component, OnInit, ViewChild , ElementRef} from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { ReadMoreComponent } from '../read-more/read-more.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MagServiceService } from '../services/mag-service.service';
import { CommonModule } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-display-magazine',
  standalone: true,
  imports: [CommonModule, NgxExtendedPdfViewerModule],
  templateUrl: './display-magazine.component.html',
  styleUrls: ['./display-magazine.component.css']
})
export class DisplayMagazineComponent implements OnInit {
  magazine: any;
  magazineID: any;
  readMagazine: any;
  pdfUrl = '';
  isAdminLoggedIn: boolean = false;
  constructor(
    private magService: MagServiceService,
    private apiServices: ApiServiceService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  private modalservice:NgbModal) { }

@ViewChild('content') popupview!:ElementRef;

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
      this.magazineID = magazineID
      let url = this.readMagazine.magazinePDF
      this.pdfUrl = url
      console.log(this.pdfUrl);
      this.modalservice.open(this.popupview, {size:'lg'})
    });
  }

  deleteMagazine(magazineID: number) {
    return this.magService.destroyMagazine(magazineID).subscribe((data: any) => {
      this.ngOnInit();
      console.log(magazineID);
    });
    alert('Article deleted successfully!');
  }
}

