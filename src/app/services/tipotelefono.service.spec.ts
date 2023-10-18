import { TestBed } from '@angular/core/testing';

import { TipotelefonoService } from './tipotelefono.service';

describe('TipotelefonoService', () => {
  let service: TipotelefonoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipotelefonoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
