import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  public hubara_desc : string = "Los áridos y descarnados jables, malpaíses y pedregales de las islas orientales de Canarias constituyen el hábitat de la hubara canaria, una de las más singulares aves de la fauna española, cuya población —amenazada por múltiples problemas— ha disminuido alarmantemente en los últimos años. Especie perfectamente adaptada a la sequedad y a la escasez de recursos de las áreas donde habita, la hubara es un ave omnívora y muy terrestre, cuya población está siendo objeto de diferentes planes de conservación y manejo."
  
  constructor() { }

  ngOnInit(): void {
  }

}
