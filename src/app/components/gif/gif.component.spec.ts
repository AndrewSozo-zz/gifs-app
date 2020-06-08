import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GifComponent } from './gif.component';
import { By } from '@angular/platform-browser';
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
        debugElement = fixture.debugElement;
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.gif = gif as IGif;
    fixture.detectChanges();
    const titleValidationMessage = debugElement.query(
      By.css('img[data-qa=gif]')
    );
    expect(titleValidationMessage).toBeTruthy();
  });
});
