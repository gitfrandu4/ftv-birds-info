import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdListComponent } from './bird-list.component';

describe('BirdListComponent', () => {
  let component: BirdListComponent;
  let fixture: ComponentFixture<BirdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirdListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
