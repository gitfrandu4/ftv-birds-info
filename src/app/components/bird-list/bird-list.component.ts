import { Component, Input, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { Bird } from 'src/app/models/bird.model';
import { ShowBirdService } from '../../services/show-bird.service';

@Component({
  selector: 'app-bird-list',
  templateUrl: './bird-list.component.html',
  styleUrls: ['./bird-list.component.css']
})

export class BirdListComponent implements OnInit {

  @Input() birds: Bird[] = [];
  @Input() isFetching: boolean = false;
  
  public idBirdShow: string = "";
  public showBird: Bird = this.birds[0];

  constructor(private showBirdService: ShowBirdService) { }

  
  ngOnInit(): void {
    // Nos suscribimos al Subject que expone el servicio ShowBirdService
    this.showBirdService.changeBirdObservable.subscribe(showBirdResponse => {
      this.showBird = showBirdResponse;
    });
  }

  /**
   * 
   * @param id Id del bird seleccionado
   */
  changeBirdInfo(id: string | undefined){
    
    this.birds.forEach(
       (bird) =>{
        if (bird.id === id){
          this.showBird = bird;
          // alert("Bird found");
        }
      }
    );
    this.showBirdService.sendIdBird(this.showBird);
  }
}
