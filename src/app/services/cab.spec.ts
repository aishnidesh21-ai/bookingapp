import { TestBed } from '@angular/core/testing';

import { Cab } from './cab';

describe('Cab', () => {
  let service: Cab;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cab);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
