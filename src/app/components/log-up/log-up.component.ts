import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-log-up',
  templateUrl: './log-up.component.html',
  styleUrls: ['./log-up.component.css']
})
export class LogUpComponent implements OnInit {

  isLoading = false;
  error: string;

  constructor(private authService: AuthService, private router: Router) {
    this.error = "";
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    console.log(email, password);

    this.authService.signup(email, password).subscribe(
      // LogUp success
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/home']);
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}