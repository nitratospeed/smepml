import { TestBed } from '@angular/core/testing';

import { SintomaService } from './sintoma.service';

describe('SintomaService', () => {
  let service: SintomaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SintomaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
