import { AppPage } from './app.po';
import {$, $$, browser, logging} from 'protractor';
import {searchText} from './app.constants';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.get('/');
  });


  it('should display gifs list, search input, pagination component', async () => {
    const gifsList = await page.elementIsPresent('div', 'gifs-list');
    const searchInput = await page.elementIsPresent('input', 'search-input');
    const pagonationComponent = await page.elementIsPresent('pagination-controls', 'pagination');
    expect(gifsList).toBeTruthy();
    expect(searchInput).toBeTruthy();
    expect(pagonationComponent).toBeTruthy();
  });

  it('should display every event component', async () => {
    const gifsComponents = $$('app-gif[data-qa=gif-component]');
    expect(gifsComponents).toBeTruthy();
  });


  it('should add new event to events list', async () => {

    const searchInput = $('input[data-qa=search-input]');
    expect(searchInput.getText()).toBe('');
    searchInput.sendKeys(searchText);

    browser.sleep(500);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
