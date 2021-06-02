import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {
  isLoginMode = false;
  isLoading = false;
  error: string;

  constructor(private authService: AuthService) { 
    this.error = "";
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
  
    console.log(email, password);
    
    if (this.isLoginMode) {
      
      return;
    
    } else {

      this.authService.signup(email, password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
      }, errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          // switch(errorResponse.error.error.message){
          //   case 'EMAIL_EXISTS':
          //       this.error = "Error - El email ya está registrado";
          //       break;
          //     default:
          //       this.error = "An error ocurred!";
          //       break;
          // }
          this.isLoading = false;
        }
      );
    }
    form.reset();
  }
}