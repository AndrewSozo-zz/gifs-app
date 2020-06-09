import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HttpService] });
    service = TestBed.inject(HttpService);
  });

  it('gf', () => {
    expect(service.gf.search).toBeTruthy();
  });

  it('should call search method', async () => {
    const searchResult = await service.gf.search('cat', {
      limit: 10,
      offset: 1,
    });
    expect(searchResult).toBeTruthy();
  });
});
