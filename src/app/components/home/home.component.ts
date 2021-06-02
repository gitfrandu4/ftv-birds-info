import { Component, Input, OnInit } from '@angular/core';
import { Bird } from 'src/app/models/bird.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PostBirdService } from 'src/app/services/post-bird.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loadedBirds: Bird[] = [];
  isFetching!: boolean;

  constructor(private http: HttpClient, private postBirdService: PostBirdService) { }

  ngOnInit() {
    this.fetchBirds();
  }

  private fetchBirds() {
    this.isFetching = true;
    // Send Http Request
    this.postBirdService.fetchBird().subscribe((birds: Bird[]) => {
      this.isFetching = false;
      this.loadedBirds = birds;
    });
  }

  // private fetchBirds() {
  //   // Send Http Request  
  //   this.http
  //     .get<{ [key: string]: Bird }>('https://birds-info-a3a1d-default-rtdb.europe-west1.firebasedatabase.app/birds.json')
  //     .pipe(
  //       map((responseData: { [key: string]: Bird }) => {

  //         const birdsArray : Bird[] = []

  //         for (const key in responseData) {
  //           if (responseData.hasOwnProperty(key)) {
  //             birdsArray.push({ ...responseData[key], id: key })
  //           }
  //         }
  //         return birdsArray;
  //       })
  //     )
  //     .subscribe(birds => {
  //       // console.log(birds);
  //       this.loadedBirds = birds;
  //     });
  // }

  deleteBird(id: string){
    let i = this.loadedBirds.findIndex(function(bird) {
      return bird.id == id;
    });

    if (i != -1)
      this.loadedBirds.splice(i, 1);
  }
}
