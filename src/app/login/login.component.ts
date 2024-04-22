import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule , FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  //imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb:FormBuilder, private http: HttpClient, private router: Router){
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  
  onSubmitLogin() {

    console.log(this.loginForm.value.password);

    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json')
    

    const body = JSON.stringify(this.loginForm.value);
    
    this.http.post('http://localhost:3000/api/v1/admin/login', body, {headers}).subscribe(
      response => {
        console.log('Server response:', response);{
        this.router.navigate(['/dashboard'])
        }     
        // Reset the form after successful submission
        this.loginForm.reset();
      },
      error => {
        console.error('Error', error);{
          if (error.status === 400){
            this.errorMessage = 'Invalid Email or Password'
          }
          else{
            this.errorMessage = 'Something Went Wrong'
          }
        }
      }
    );
    
  }


 

}