import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from "../../partials/title/title.component";
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputContainerComponent } from '../../partials/input-container/input-container.component';
import { InputValidationComponent } from "../../partials/input-validation/input-validation.component";
import { TextInputComponent } from "../../partials/text-input/text-input.component";
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";
import { AuthService } from '../../../auth-service.service';
import { Button, ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, DialogModule, InputTextModule, ButtonModule, FormsModule,CommonModule, ReactiveFormsModule, TitleComponent, InputContainerComponent, InputValidationComponent, TextInputComponent, DefaultButtonComponent, Button,
    
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  loginform!:FormGroup
  isSubmitted = false;
  returnUrl = '';
  showRegister = false;
  showDialog = false;
  form = {
    name: '',
    email: '',
    password: ''
  };


  constructor(private formBuilder:FormBuilder,
    private userService: UserService,
    private activatedroute:ActivatedRoute,
    private router:Router, private authService:AuthService
  ) { }
  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.activatedroute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.loginform.controls
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginform.invalid) {
      return;
    }
    this.authService.login({
      email:this.fc.email.value,
      password:this.fc.password.value
    }).subscribe(()=> 
    this.router.navigateByUrl(this.returnUrl));
    console.log('Form Submitted', this.loginform.value);
    // Here you would typically handle the login logic, e.g., call an authentication service
  }



  hello() {
    console.log("hello from regsiter");
    this.showRegister = true;
  }

  onSubmitReg() {
    this.authService.register(this.form).subscribe({
      next: (res) => {
        alert('Registered successfully');
        this.showRegister = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert('Registration failed');
      }
    });
  }

}
