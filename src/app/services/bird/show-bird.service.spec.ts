import { TestBed } from '@angular/core/testing';

import { ShowBirdService } from './show-bird.service';

describe('ShowBirdService', () => {
  let service: ShowBirdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowBirdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
