import { Component, Input, OnInit } from '@angular/core';
import { Bird } from 'src/app/models/bird';

@Component({
  selector: 'app-bird-list',
  templateUrl: './bird-list.component.html',
  styleUrls: ['./bird-list.component.css']
})

export class BirdListComponent implements OnInit {

  @Input() birds: Bird[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
