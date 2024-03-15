import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent  {

 
  articleForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.articleForm = this.fb.group({
      title: [''],
      author: [''],
      content: [''],
      file: ['']
    });
  }
  
  onSubmit() {
    // Handle form submission
    const formData = new FormData();
    formData.append('title', this.articleForm.value.title);
    formData.append('author', this.articleForm.value.author);
    formData.append('content', this.articleForm.value.content);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    // Send formData to your server using HttpClient
    this.http.post('http://localhost:3000/api/articles', formData).subscribe(
    response => {
      console.log('Server response:', response);
      // Reset the form after successful submission
      this.articleForm.reset();
      this.selectedFile = null;
    },
    error => {
      console.error('Error:', error);
    }
  );
  }

  onFileSelected(event: any) {
    // Handle file selection
    this.selectedFile = event.target.files[0];
  }

}
