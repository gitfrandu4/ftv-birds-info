# Fuerteventura Birds-Info 馃

Trabajo de la asignatura DAW II (Desarrollo de Aplicaciones Web II) consistente en una aplicaci贸n de p谩gina 煤nica (SPA - _Single Page Application_) desarrollada en Angular que, a trav茅s del uso de servicios y rutas, establezca una comunicaci贸n entre componentes lejanos. 

La aplicaci贸n implementa un 铆ndice de aves end茅micas de la isla de Fuerteventura. Para a帽adir/eliminar aves del 铆ndice es necesario que el usuario haya iniciado sesi贸n en el aplicativo web. 

**Autor** 鉁掞笍

* Francisco Javier L贸pez-Dufour Morales

## Construido con 鈿欙笍

* Angular Framework: v11.2.13

    * Angular CLI: v11.2.12
    * Node.js. v14.15.4
    * npm package manager: v7.10.0
    * TypeScript: v4.1.5

## Funcionalidades 馃搵

### Funciones CRUD

La aplicaci贸n implementa funcionalidades b谩sicas para Crear, Leer y Borrar aves del 铆ndice. 

Para poder borrar o agregar un nuevo ave es necesario haber iniciado sesi贸n en el aplicativo. 

<p align="center">
  <img src="images/image-20210608095145489.png">
</p>

### Servicios

Los servicios en Angular son una parte esencial dentro de la arquitectura de las aplicaciones construidas con este framework. Su principal funci贸n es la de proveer datos a los componentes que los consumen y que delegan en ellos la responsabilidad de acceder a la informaci贸n y la realizaci贸n de operaciones con dichos datos. 

Se han implementado varios servicios en Angular con el objetivo de:

* comunicar componentes lejanos entre s铆  
* capturar la l贸gica de comunicaci贸n con la base de datos

#### Comunicaci贸n entre componentes no cercanos

Para la comunicaci贸n entre componentes no cercanos se han implementado servicios que se encargan de la comunicaci贸n entre estos. 

Por ejemplo:

<p align="center">
  <img src="images/image-20210608104247942.png">
</p>

```typescript
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bird } from 'src/app/models/bird.model';

@Injectable({
  providedIn: 'root'
})
export class ShowBirdService {

  // Esta variable almacenar谩 el id del ave que se mostrar谩 en detalle en la home
  public bird!: Bird;
  public birdDeleted: boolean =false;

  // Esta variable nos permite enviar mensajes a m煤ltiples observadores
  // Permitir谩 a varios componentes subscribirse al Subject
  // Cada vez que se seleccione mostrar un ave diferente los componentes (BirdInfoComponent) recibir谩 
  // el nuevo Id que debe mostrar
  private changeBirdSubject = new Subject<Bird>();

  // Esta variable auxiliar nos facililitar la sintaxis para que nustros componentes se puedan
  // subscribir al Subject
  changeBirdObservable = this.changeBirdSubject.asObservable();

  constructor() {
  }
  
   // Esta funci贸n incluye la l贸gica para enviar el nuevo id a todos los componentes subscritos al Subject 
   sendIdBird(bird: Bird){
    // alert("sendIdBird: " + bird.id);
    this.bird = bird;
    this.changeBirdSubject.next(this.bird);
   }

// ...
}
```



#### Comunicaci贸n con Firebase

Para la comunicaci贸n con la base de datos se han empleado servicios que capturan la l贸gica que comunica la aplicaci贸n con la base de datos mediante peticiones HTTP. 

Por ejemplo:

* Autenticaci贸n: 
    * `auth.service.ts`: realiza la autenticaci贸n del usuario con el servidor de la BD. Implementa m茅todos como `login()`, `autologin()`, `signup()` , `logout()`, `autologout()`, manejo de errores, ...
    * `auth-interceptor.service.ts`: captura las peticiones HTTP que realiza la aplicaci贸n y a帽ade un token que identifica al usuario cuando este est谩 autenticado. 
    * `auth-guard.service.ts`: protege las rutas que solo pueden ser accedidas si el usuario est谩 autenticado. 
* Acceso al 铆ndice de aves almacenado en Firebase:
    * `post-bird.service.ts`: realiza peticiones HTTP a la BD para leer del 铆ndice o agregar nuevos elementos al mismo. 

### Rutas

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './components/create/create.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LogUpComponent } from './components/log-up/log-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AuthGuardService } from '../app/services/auth/auth-guard.service';

const routes: Routes = [
  { path: 'create', component: CreateComponent, canActivate: [AuthGuardService]},
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'logup', component: LogUpComponent, canActivate: [AuthGuardService] },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
```




### Empleando Angular Material

Para este trabajo se han empleado varios componentes de la librer铆a de Angular Material. Esta librer铆a ofrece componentes web con un dise帽o Material design, una gu铆a creada por Google. 

Algunos de los componentes utilizados han sido:

* `<mat-action-list>` each item in an action list is a <button> element.
* `<mat-card>` is a content container for text, photos, and actions in the context of a single subject.
* `<mat-toolbar>` is a container for headers, titles, or actions.

### Almacenamiento 馃捑

Para el almacenamiento del 铆ndice hemos empleado **`Firebase Realtime Database`**. Este almacenamiento nos permite almacenar y sincronizar datos en una base de datos NoSQL en la nube en formato JSON. Los datos se mantienen sincronizados en tiempo real con todos los cliente conectados. 

<p align="center">
<img src="https://www.gstatic.com/devrel-devsite/prod/vacc2a2a4a4394c7c42dc62dba69eb022d7680ce4a368d4b28c3e984cc9155a81/firebase/images/lockup.png?dcb_=0.8896867411947109" alt="Firebase">
</p>

## Deployment 馃殌

### Deploy to GitHub Pages 馃摎

Seguimos los pasos

1. Creamos el repositorio de GitHub para nuestro proyecto

2. Configuramos `Git` en nuestro repositorio local para conectarlo con el repositorio remoto. Los comandos son similares a los siguientes:

```
git remote add origin https://github.com/gitfrandu4/ftv-birds-info
git branch -M main
git push -u origin main
```

3. Create and check out a git branch named gh-pages.

```
git checkout -b gh-pages
```

4. Hacemos build del prouecto utilizando el comando de Angular CLI `ng build`.

```
ng build --output-path docs --base-href /your_project_name/

Nota: /your_project_name/ es el nombre del proyecto especificado en el paso 1. 
Debemos incluir los slashes. 

ng build --output-path docs --base-href=""
```

5. Cuando se completa el build copiamos `docs/index.html` en un nuevo archivo y lo renombramos como `docs/404.html`.

6. Commit + push

7. En el proyecto de Github > Settings > GitHub Pages > Configuramos el sitio para publicar desde la carpeta `docs`.

8. Save

9. Accedemos al enlace donde se ha desplegado el proyecto: https://gitfrandu4.github.io/ftv-birds-info/

Ayuda: https://angular.io/guide/deployment

Nota:

* Para eliminar una rama (por ejemplo gh-pages):

```bash
git branch -d gh-pages    // 1) from local
git push origin :gh-pages // 2) from remote repository
```

## Cr茅ditos

Cr茅ditos de las im谩genes empleadas para la demo:

* Proyecto TSP de la Consejer铆a de Educaci贸n y Universidades del Gobierno de Canarias.
    * https://www3.gobiernodecanarias.org/medusa/wiki/index.php?title=P%C3%A1gina_principal 
* Enciclopedia de las Aves de Espa帽a, editada por SEO/BirdLife y la Fundaci贸n BBVA en 2008
