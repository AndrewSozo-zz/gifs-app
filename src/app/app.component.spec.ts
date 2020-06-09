import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpService } from './services/http.service';
import { GifsResult } from '@giphy/js-fetch-api/src/result-types';

const gifResult: GifsResult = {} as GifsResult;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpService: HttpService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [NgxPaginationModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        httpService = TestBed.inject(HttpService);
      });
  }));

  it('should create component instance', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('AppComponent OnInit', () => {
    spyOn(component, 'search').and.callThrough();
    component.ngOnInit();
    expect(component.search).toHaveBeenCalled();
  });

  it('should render a tag with title "GIFs"', () => {
    fixture.detectChanges();
    const nativeElement = fixture.debugElement.nativeElement;
    const titleText = nativeElement.querySelector('a').textContent;
    expect(titleText).toEqual('GIFs');
  });

  it('should inject HttpService', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(async () => {
      expect(component.gifsResult).toEqual(
        await httpService.search('cat', {
          limit: 10,
          offset: 1,
        })
      );
    });
  }));

  it('should render footer p tag with text "\'© 2020 GIFs"', () => {
    fixture.detectChanges();
    const titleText = fixture.debugElement.query(
      By.css('p[data-qa=footer-info]')
    ).nativeElement.textContent;
    expect(titleText).toEqual('© 2020 GIFs');
  });

  it("shouldn't get gifs list if not async", () => {
    spyOn(httpService, 'search').and.returnValue(Promise.resolve(gifResult));
    fixture.detectChanges();
    expect(component.gifsResult).toBe(undefined);
  });

  it('should get gifs list if async', async(() => {
    spyOn(httpService, 'search').and.returnValue(Promise.resolve(gifResult));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.gifsResult).toBe(gifResult);
    });
  }));

  it('should call component search method and get gifs result', async () => {
    spyOn(component, 'search').and.callThrough();
    component.query = 'cat';
    await component.search(component.query);
    fixture.detectChanges();
    expect(component.search).toHaveBeenCalledWith(component.query);
  });

  it('should call component changePage method and get gifs result with offset 2', async () => {
    spyOn(component, 'changePage').and.callThrough();
    spyOn(httpService, 'search').and.callThrough();
    await component.changePage(2);
    fixture.detectChanges();
    expect(component.changePage).toHaveBeenCalledWith(2);
    expect(httpService.search).toHaveBeenCalledWith('cat', {
      offset: 2,
      limit: 10,
    });
  });
});
