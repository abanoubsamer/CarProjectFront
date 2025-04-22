import { TestBed } from '@angular/core/testing';

import { RatingQueryService } from './rating-query.service';

describe('RatingQueryService', () => {
  let service: RatingQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
