import { Component, OnInit } from '@angular/core';

import { HttpService } from './services/http.service';
import {GifsResult} from '@giphy/js-fetch-api/src/result-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  gifsResult: GifsResult;
  page = 1;
  term = '';

  constructor(private httpService: HttpService) {}

  async ngOnInit() {
    await this.search();
  }

  async search(searchWord?: string) {
    searchWord?.length ? (this.term = searchWord) : (this.term = 'cat');
    this.page = 1;

    this.gifsResult = await this.httpService.search(this.term, {
      limit: 10,
      offset: this.page,
    });
  }

  async changePage(page) {
    this.page = page;
    this.gifsResult = await this.httpService.search(this.term, {
      offset: this.page,
      limit: 10,
    });
  }
}
