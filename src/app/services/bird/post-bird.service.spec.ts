import { TestBed } from '@angular/core/testing';

import { PostBirdService } from './post-bird.service';

describe('PostBirdService', () => {
  let service: PostBirdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostBirdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
