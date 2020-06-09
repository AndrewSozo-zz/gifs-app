import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SearchInputComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create component instance', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('SearchInputComponent OnInit', () => {
    spyOn(component, 'setSearchSubscription').and.callThrough();
    fixture.detectChanges();
    expect(component.setSearchSubscription).toHaveBeenCalled();
  });

  it('should call updateSearch method', () => {
    spyOn(component, 'updateSearch').and.callThrough();
    component.updateSearch('cat');
    fixture.detectChanges();
    component.searchSubject$.asObservable().subscribe(data => {
      expect(data).toEqual('cat');
    });
  });
});
