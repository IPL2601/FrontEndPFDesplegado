import { TestBed } from '@angular/core/testing';

import { CargarScriptsService } from '../../services/cargar-script/cargar-scripts.service';

describe('CargarScriptsService', () => {
  let service: CargarScriptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarScriptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
