import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bird } from 'src/app/models/bird.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostBirdService } from 'src/app/services/bird/post-bird.service';
import { ShowBirdService } from 'src/app/services/bird/show-bird.service';

@Component({
  selector: 'app-bird-info',
  templateUrl: './bird-info.component.html',
  styleUrls: ['./bird-info.component.css']
})
export class BirdInfoComponent implements OnInit, OnDestroy {

  @Input() birds: Bird[] = [];
  @Output() idBirdDeleted = new EventEmitter<string>();

  public idBirdShow: string = "";

  public showBird: Bird = this.birds[0];
  public error = null;

  private userSub!: Subscription;
  isAuthenticated = false;

  constructor(public showBirdService: ShowBirdService, 
              private postBirdService: PostBirdService,
              private authService: AuthService) {

    this.showBird = this.birds[0];
  }


  ngOnInit(): void {
    // Nos suscribimos al Subject que expone el servicio
    this.showBirdService.changeBirdObservable.subscribe(showBirdResponse => {
      this.showBird = showBirdResponse;
    }, error => {
      this.error = error.message;
    });
    
    // Setup a subscription to 'authService.user'
    this.userSub = this.authService.user.subscribe(user => {
      // this.isAuthenticated = !user ? false : true;
      this.isAuthenticated = !!user;
    });
  }

  // ngDoCheck(): void {
  //   this.showBird = this.birds[0];
  //   this.birds.forEach(
  //      (bird) =>{
  //       if (bird.id === this.idBirdShow){
  //         this.showBird = bird;
  //       }
  //     }
  //   );
  // }

  onDeleteBird(id: any) {
    // Send HTTP Request
    this.postBirdService.deleteBird(id).subscribe();
    this.idBirdDeleted.emit(id);
    this.showBirdService.clearBird();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
