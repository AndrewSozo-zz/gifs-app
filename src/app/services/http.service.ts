import { Injectable } from '@angular/core';

import { GiphyFetch, SearchOptions } from '@giphy/js-fetch-api';
import { environment } from '../../environments/environment';
import { GifsResult } from '@giphy/js-fetch-api/src/result-types';

@Injectable({ providedIn: 'root' })
export class HttpService {
  gf = new GiphyFetch(environment.giphyApiKey);

  async search(term: string, options: SearchOptions): Promise<GifsResult> {
    try {
      return await this.gf.search(term, options);
    } catch (error) {
      throw error;
    }
  }
}
