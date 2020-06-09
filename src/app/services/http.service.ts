import { Injectable } from '@angular/core';

import { GiphyFetch, SearchOptions } from '@giphy/js-fetch-api';
import { environment } from '../../environments/environment';
import { GifsResult } from '@giphy/js-fetch-api/src/result-types';

@Injectable({ providedIn: 'root' })
export class HttpService {
  /**
   * property gf with new GiphyFetch() instance
   *
   * @memberof HttpService
   * @public
   * @type {GiphyFetch}
   */
  gf = new GiphyFetch(environment.giphyApiKey);

  /**
   * async search method for getting search data from GiphyFetch Api;
   *
   * @memberof HttpService
   * @param query
   * @param options
   * @public
   * @returns {Promise<GifsResult>}
   */
  async search(query: string, options: SearchOptions): Promise<GifsResult> {
    try {
      return await this.gf.search(query, options);
    } catch (error) {
      throw error;
    }
  }
}
