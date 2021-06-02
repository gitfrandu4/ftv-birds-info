import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bird } from 'src/app/models/bird.model';

@Injectable({
  providedIn: 'root'
})
export class ShowBirdService {

  // Esta variable almacenará el id del ave que se mostrará en detalle en la home
  public bird!: Bird;
  public birdDeleted: boolean =false;

  // Esta variable nos permite enviar mensajes a múltiples observadores
  // Permitirá a varios componentes subscribirse al Subject
  // Cada vez que se seleccione mostrar un ave diferente los componentes (BirdInfoComponent) recibirá 
  // el nuevo Id que debe mostrar
  private changeBirdSubject = new Subject<Bird>();

  // Esta variable auxiliar nos facililitar la sintaxis para que nustros componentes se puedan
  // subscribir al Subject
  changeBirdObservable = this.changeBirdSubject.asObservable();

  constructor() {
  }
  
   // Esta función incluye la lógica para enviar el nuevo id a todos los componentes subscritos al Subject 
   sendIdBird(bird: Bird){
    // alert("sendIdBird: " + bird.id);
    this.bird = bird;
    this.changeBirdSubject.next(this.bird);
   }

   clearBird(){
     this.bird = {
      especie: "",
      cientifico: "",
      img: "",
      desc: "",
      autor: ""
     }
    this.changeBirdSubject.next(this.bird);
   }
}