import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule , FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  //imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb:FormBuilder, private http: HttpClient){
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  
  onSubmit() {
    // Handle form submission
    const formData = new FormData();
    console.log(this.loginForm.value.email);
    
    formData.append('email', this.loginForm.value.email);
    
    //console.log(this.articleForm.value.title);
    formData.append('password', this.loginForm.value.password);

    console.log(this.loginForm.value.password);

    this.http.post('http://localhost:3000/api/v1/admin/login', formData).subscribe(
      response => {
        console.log('Server response:', response);
       
        
        // Reset the form after successful submission
        this.loginForm.reset();
      },
      error => {
        console.error('Error:', error);
      }
    );

  }


 

}