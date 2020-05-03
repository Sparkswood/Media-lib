import { TestBed } from '@angular/core/testing';

import { GameFirebaseService } from './game-firebase.service';

describe('GameFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameFirebaseService = TestBed.get(GameFirebaseService);
    expect(service).toBeTruthy();
  });
});
