import { TestBed } from '@angular/core/testing';

import { MovieFirebaseService } from './movie-firebase.service';

describe('MovieFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieFirebaseService = TestBed.get(MovieFirebaseService);
    expect(service).toBeTruthy();
  });
});
