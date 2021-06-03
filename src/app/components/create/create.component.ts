import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Bird } from 'src/app/models/bird.model';
import { PostBirdService } from 'src/app/services/bird/post-bird.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  public hubara_desc: string = "Los áridos y descarnados jables, malpaíses y pedregales de las islas orientales de Canarias constituyen el hábitat de la hubara canaria, una de las más singulares aves de la fauna española, cuya población —amenazada por múltiples problemas— ha disminuido alarmantemente en los últimos años. Especie perfectamente adaptada a la sequedad y a la escasez de recursos de las áreas donde habita, la hubara es un ave omnívora y muy terrestre, cuya población está siendo objeto de diferentes planes de conservación y manejo."

  loadedBirds: Bird[] = [];

  constructor(private http: HttpClient, private postBirdService: PostBirdService) { }

  ngOnInit(): void {
    this.onFetchBirds();
  }

  // Utiliza el servicio PostBirdService para hacer una petición HTTP que guarde en la BD el 
  // ave que introducimos en el form
  onSubmitform(form: NgForm) {
    // Send Http Request
    this.postBirdService.createAndStoreBird(form.value.especie, form.value.nombre_cientifico, form.value.descripcion, form.value.image_url, form.value.autor);
    
    form.reset();
  }
  onFetchBirds() {
    // Send Http Request
    this.postBirdService.fetchBird();
  }
}
