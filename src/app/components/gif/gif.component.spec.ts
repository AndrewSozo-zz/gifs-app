import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GifComponent } from './gif.component';
import { IGif } from '@giphy/js-types';

const gif = {
  images: {
    downsized_medium: {
      url:
        'https://media0.giphy.com/media/13CoXDiaCcCoyk/giphy.gif?cid=281562cec7ee1c053aaf4337b5dccac29e9f055897bb1d28&rid=giphy.gif',
    },
  },
};

describe('GifComponent', () => {
  let component: GifComponent;
  let fixture: ComponentFixture<GifComponent>;
  let debugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GifComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(GifComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
      });
  }));

  it('should create component instance', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should check if gif exist', () => {
    component.gif = gif as IGif;
    fixture.detectChanges();
    expect(component.gif).toEqual(gif as IGif);
  });
});
