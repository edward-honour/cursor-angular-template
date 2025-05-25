import { TestBed } from '@angular/core/testing';

import { ResolverServiceService } from './resolver-service.service';

describe('ResolverServiceService', () => {
  let service: ResolverServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolverServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
