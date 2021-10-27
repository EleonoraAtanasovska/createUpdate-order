import { TestBed } from '@angular/core/testing';

import { NarudjbenicaService } from './narudjbenica.service';

describe('NarudjbenicaService', () => {
  let service: NarudjbenicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NarudjbenicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
