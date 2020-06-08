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
  @Input() readonly placeholder = '';

  @Output() setValue: EventEmitter<string> = new EventEmitter();

  private searchSubject$: Subject<string> = new Subject();

  constructor() {
    this._setSearchSubscription();
  }

  updateSearch(searchTextValue: string) {
    this.searchSubject$.next(searchTextValue);
  }

  private _setSearchSubscription() {
    this.searchSubject$
      .pipe(debounceTime(500))
      .subscribe((searchValue: string) => {
        this.setValue.emit(searchValue);
      });
  }

  ngOnDestroy() {
    if (this.searchSubject$) {
      this.searchSubject$.unsubscribe();
    }
  }
}
