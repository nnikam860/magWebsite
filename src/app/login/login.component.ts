import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule , FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  )
  {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  // ngOnInit():void{
  //   this.authService.reloadAdmin()
  // }
  onSubmitLogin() {
    const { email, password } = this.loginForm.value;
    this.authService.userlogin(email, password)
    .subscribe(
      response => {
        console.log('Server response:', response);
        this.router.navigate(['/dashboard']);
        // Reset the form after successful submission
        this.loginForm.reset();
      },
      error => {
        console.error('Error', error);
        this.errorMessage = error;
      }
    );
  }
}