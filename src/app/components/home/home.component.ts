import { Component, OnInit } from '@angular/core';
import { Bird } from 'src/app/models/bird.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loadedBirds: Bird[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchBirds();
  }

  private fetchBirds() {
    // Send Http Request
    this.http
      .get<{ [key: string]: Bird }>('https://birds-info-a3a1d-default-rtdb.europe-west1.firebasedatabase.app/birds.json')
      .pipe(
        map((responseData: { [key: string]: Bird }) => {

          const birdsArray : Bird[] = []

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              birdsArray.push({ ...responseData[key], id: key })
            }
          }
          return birdsArray;
        })
      )
      .subscribe(birds => {
        // console.log(birds);
        this.loadedBirds = birds;
      });
  }
}
