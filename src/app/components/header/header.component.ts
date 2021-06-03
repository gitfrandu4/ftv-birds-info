import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  private userSub!: Subscription;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    // Setup a subscription to 'authService.user'
    this.userSub = this.authService.user.subscribe(user => {
      // this.isAuthenticated = !user ? false : true;
      this.isAuthenticated = !!user;
    });
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
