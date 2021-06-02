import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { AuthResponseData } from "../../models/authResponseData.model";

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

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    console.log(email, password);

    this.authService.login(email, password).subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    
    form.reset();
  }
}