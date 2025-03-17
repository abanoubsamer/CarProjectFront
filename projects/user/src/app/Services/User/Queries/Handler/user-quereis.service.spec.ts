import { TestBed } from '@angular/core/testing';

import { UserQuereisService } from './user-quereis.service';

describe('UserQuereisService', () => {
  let service: UserQuereisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserQuereisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
