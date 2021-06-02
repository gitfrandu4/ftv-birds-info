import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './components/create/create.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LogUpComponent } from './components/log-up/log-up.component';
import { LogInComponent } from './components/log-in/log-in.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'logup', component: LogUpComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }