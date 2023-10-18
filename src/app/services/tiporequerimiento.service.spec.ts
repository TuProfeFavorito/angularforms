import { TestBed } from '@angular/core/testing';

import { TiporequerimientoService } from './tiporequerimiento.service';

describe('TiporequerimientoService', () => {
  let service: TiporequerimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiporequerimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
