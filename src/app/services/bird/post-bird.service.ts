import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bird } from '../../models/bird.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PostBirdService {

  constructor(private http: HttpClient) { }

  // Desde aquí enviaremos la petición Http
  createAndStoreBird(especie: string, cientifico: string, desc: string, img: string, autor: string) {
    const postData: Bird = {
      especie: especie,
      cientifico: cientifico,
      desc: desc,
      img: img,
      autor: autor,
    };

    //console.log(postData);

    // Send Http Request
    this.http.post<{
      especie: string;
      cientifico: string;
      desc: string;
      img: string;
      autor: string;
      id?: string;
    }>(
      'https://birds-info-a3a1d-default-rtdb.europe-west1.firebasedatabase.app/birds.json',
      postData
    ).subscribe(responseData => {
      console.log(responseData);
    });
  }

  fetchBird() {
    // Send Http Request
    return this.http
      .get<{ [key: string]: Bird }>('https://birds-info-a3a1d-default-rtdb.europe-west1.firebasedatabase.app/birds.json')
      .pipe(
        // Transformamos los datos 
        map((responseData: { [key: string]: Bird }) => {

          const birdsArray: Bird[] = []

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              birdsArray.push({ ...responseData[key], id: key })
            }
          }
          return birdsArray;
        })
      )
      // Ya no nos hace falta suscribirnos
      // .subscribe(birds => {
      // })
      ;
  }

  deleteBird(id: string){
    return this.http.delete('https://birds-info-a3a1d-default-rtdb.europe-west1.firebasedatabase.app/birds/'+id+'.json');
  }
}
