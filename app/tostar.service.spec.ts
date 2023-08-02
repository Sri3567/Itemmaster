import { TestBed } from '@angular/core/testing';

import { TostarService } from './tostar.service';

describe('TostarService', () => {
  let service: TostarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TostarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
