import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-magazine',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-magazine.component.html',
  styleUrls: [ './add-magazine.component.css']
})
export class AddMagazineComponent {
  magazineForm: FormGroup;
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.magazineForm = this.fb.group({
      title: [''],
      author: [''],
      industry: [''],
      magazinePDF:[''],
      coverImage: ['']
    });
  }
    onSubmit() {
      if (this.magazineForm.valid && this.selectedFile) {
    // Handle form submission
    const formData = new FormData();
    formData.append('title', this.magazineForm.value.title);
    console.log(this.magazineForm.value.title);
    
    formData.append('author', this.magazineForm.value.author);
    formData.append('industry', this.magazineForm.value.industry);    
    if (this.selectedFile) {
      formData.append('magazinePDF', this.selectedFile, this.selectedFile.name);
      formData.append('coverImage', this.selectedFile, this.selectedFile.name);
    }

    console.log(formData);
      // Send formData to your server using HttpClient
    this.http.post('https://api.digitalbusinessreview.com/api/v1/magazine/uploadMag', formData).subscribe(
    response => {
      console.log('Server response:', response);
      // Reset the form after successful submission
      
      this.selectedFile = null;
    },
    error => {
      console.error('Error:', error);
    }
  );
      
  alert('Magazine uploaded successfully!');
  }
}
  onFileSelected(event: any) {
    // Handle file selection
    this.selectedFile = event.target.files[0];
  }

}
