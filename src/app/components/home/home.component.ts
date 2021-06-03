import { Component, Input, OnInit } from '@angular/core';
import { Bird } from 'src/app/models/bird.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostBirdService } from 'src/app/services/bird/post-bird.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loadedBirds: Bird[] = [];
  isFetching!: boolean;
  error = null;

  constructor(private postBirdService: PostBirdService) { }

  ngOnInit() {
    this.onFetchBirds();
  }

  private onFetchBirds() {
    this.isFetching = true;
    // Send Http Request
    this.postBirdService.fetchBird().subscribe((birds: Bird[]) => {
      this.isFetching = false;
      this.loadedBirds = birds;
    }, error => {
      this.error = error.message;
      console.log(error);
    });
  }

  deleteBird(id: string){
    let i = this.loadedBirds.findIndex(function(bird) {
      return bird.id == id;
    });

    if (i != -1)
      this.loadedBirds.splice(i, 1);
  }
}
