import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bird } from 'src/app/models/bird.model';
import { PostBirdService } from 'src/app/services/post-bird.service';
import { ShowBirdService } from 'src/app/services/show-bird.service';

@Component({
  selector: 'app-bird-info',
  templateUrl: './bird-info.component.html',
  styleUrls: ['./bird-info.component.css']
})
export class BirdInfoComponent implements OnInit {

  @Input() birds: Bird[] = [];
  @Output() idBirdDeleted = new EventEmitter<string>();

  public idBirdShow: string = "";

  public showBird: Bird = this.birds[0];

  constructor(public showBirdService: ShowBirdService, private postBirdService: PostBirdService) {
    this.showBird = this.birds[0];
  }


  ngOnInit(): void {
    // Nos suscribimos al Subject que expone el servicio
    this.showBirdService.changeBirdObservable.subscribe(showBirdResponse => {
      this.showBird = showBirdResponse;
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
}
