import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  template: `
    <input
      class="form-control"
      type="search"
      aria-label="Search"
      placeholder="Search"
      data-qa="search-input"
      (keyup)="updateSearch($event.target.value)"
    />
  `,
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnDestroy {
  /**
   * input placeholder property
   *
   * @memberof SearchInputComponent
   * @public
   * @readonly
   * @type {string}
   */
  @Input() readonly placeholder = '';

  /**
   * output setValue property
   *
   * @memberof SearchInputComponent
   * @public
   * @type {EventEmitter}
   */
  @Output() setValue: EventEmitter<string> = new EventEmitter();

  /**
   * private property for search subject
   *
   * @memberof SearchInputComponent
   * @private
   * @type {Subject}
   */
  private searchSubject$: Subject<string> = new Subject();

  constructor() {
    this._setSearchSubscription();
  }

  /**
   * method for emit search query
   *
   * @memberof SearchInputComponent
   * @param searchTextValue
   * @public
   */
  updateSearch(searchTextValue: string) {
    this.searchSubject$.next(searchTextValue);
  }

  /**
   * private method for new subscription with debounce(500)
   *
   * @memberof SearchInputComponent
   * @private
   */
  private _setSearchSubscription() {
    this.searchSubject$
      .pipe(debounceTime(500))
      .subscribe((searchValue: string) => {
        this.setValue.emit(searchValue);
      });
  }

  /**
   * Angular lifecycle hook ngOnDestroy for unsubscribe
   *
   * @memberof SearchInputComponent
   * @public
   */
  ngOnDestroy() {
    if (this.searchSubject$) {
      this.searchSubject$.unsubscribe();
    }
  }
}
