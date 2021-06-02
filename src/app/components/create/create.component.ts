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

  // onSubmitform(form: NgForm) {
  //   const postData = {
  //     especie: form.value.especie,
  //     cientifico: form.value.nombre_cientifico,
  //     desc: form.value.descripcion,
  //     img: form.value.image_url,
  //     autor: form.value.autor,
  //   };

  //   //console.log(postData);

  //   // Send Http Request
  //   this.http.post<{especie: string;
  //     cientifico: string;
  //     desc: string;
  //     img: string;
  //     autor: string;
  //     id?: string;}>(
  //     'https://birds-info-a3a1d-default-rtdb.europe-west1.firebasedatabase.app/birds.json',
  //     postData
  //   ).subscribe(responseData => {
  //     console.log(responseData);
  //   }
  //   // Opcional (y más correcto): También podríamos haber hecho: 
  //   // this.http.post<{especie: string;
  //                     // cientifico: string;
  //                     // desc: string;
  //                     // img: string;
  //                     // autor: string;
  //                     // id?: string;}>(..........
  //   );
  //   form.reset();
  // }

  onFetchBirds() {
    // Send Http Request
    this.postBirdService.fetchBird();
  }

  // private fetchBirds() {
  //   // Send Http Request
  //   this.http
  //     .get<{ [key: string]: Bird }>('https://birds-info-a3a1d-default-rtdb.europe-west1.firebasedatabase.app/birds.json')
  //     .pipe(
  //       // Transformamos los datos 
  //       map((responseData: { [key: string]: Bird }) => {

  //         const birdsArray: Bird[] = []

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
}
