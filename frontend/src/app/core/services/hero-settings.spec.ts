import { TestBed } from '@angular/core/testing';

import { HeroSettings } from './hero-settings';

describe('HeroSettings', () => {
  let service: HeroSettings;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroSettings);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
