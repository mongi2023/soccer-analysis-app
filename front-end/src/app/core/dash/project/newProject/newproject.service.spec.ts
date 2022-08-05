import { TestBed } from '@angular/core/testing';

import { NewprojectService } from './newproject.service';

describe('NewprojectService', () => {
  let service: NewprojectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewprojectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
