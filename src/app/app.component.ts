import { Component, OnInit } from '@angular/core';

import { HttpService } from './services/http.service';
import { GifsResult } from '@giphy/js-fetch-api/src/result-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /**
   * property gifsResult with response from server
   *
   * @memberof AppComponent
   * @public
   * @type {GifsResult}
   */
  gifsResult: GifsResult;
  /**
   * property page contains current page for pagination
   *
   * @memberof AppComponen
   * @public
   * @type {number}
   */
  page = 1;
  /**
   * property term contains current search term
   *
   * @memberof AppComponent
   * @public
   * @type {string}
   */
  term = '';

  constructor(private httpService: HttpService) {}

  /**
   * Angular NgOnInit lifecycle hook; calling search() method for init gifsResult property
   *
   * @memberof AppComponent
   * @public
   */
  async ngOnInit() {
    await this.search();
  }

  /**
   * async method search for calling httpService.search; define initial term value
   *
   * @memberof AppComponent
   * @param searchWord
   * @public
   */
  async search(searchWord?: string) {
    searchWord?.length ? (this.term = searchWord) : (this.term = 'cat');
    this.page = 1;

    this.gifsResult = await this.httpService.search(this.term, {
      limit: 10,
      offset: this.page,
    });
  }

  /**
   * async method changePage for changing current page
   *
   * @memberof AppComponent
   * @param page
   * @public
   */
  async changePage(page: number) {
    this.page = page;
    this.gifsResult = await this.httpService.search(this.term, {
      offset: this.page,
      limit: 10,
    });
  }
}
