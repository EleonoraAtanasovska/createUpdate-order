import { TestBed } from '@angular/core/testing';

import { StavkaNarudjbeniceService } from './stavka-narudjbenice.service';

describe('StavkaNarudjbeniceService', () => {
  let service: StavkaNarudjbeniceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StavkaNarudjbeniceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
