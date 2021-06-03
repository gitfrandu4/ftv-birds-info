import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bird } from '../../models/bird.model';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class PostBirdService {

  constructor(private http: HttpClient, private authService: AuthService) { }

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
    return this.http
          .get<{ [key: string]: Bird }>('https://birds-info-a3a1d-default-rtdb.europe-west1.firebasedatabase.app/birds.json',
          {
            /**Lo comentamos porque en nuestro caso si está permitido que un usuario sin registrar acceda a 
             *la información contenida en la BD */

            // params: new HttpParams().set('auth', user.token)
          }).pipe(map((responseData: { [key: string]: Bird }) => {

        const birdsArray: Bird[] = []

        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            birdsArray.push({ ...responseData[key], id: key })
          }
        }
        return birdsArray;
      })
    );
  }

  deleteBird(id: string){
    return this.http.delete('https://birds-info-a3a1d-default-rtdb.europe-west1.firebasedatabase.app/birds/'+id+'.json');
  }
}
