import { TestBed } from '@angular/core/testing';

import { SeriesFirebaseService } from './series-firebase.service';

describe('SeriesFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeriesFirebaseService = TestBed.get(SeriesFirebaseService);
    expect(service).toBeTruthy();
  });
});
