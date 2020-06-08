import {$, $$, browser, by, element} from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  elementIsPresent(elementName: string, dataQaName: string): Promise<boolean> {
    return $(`${elementName}[data-qa=${dataQaName}`).isPresent() as Promise<boolean>;
  }

  getLastElement(elementName: string, dataQaName) {
    return $$(`${elementName}[data-qa=${dataQaName}`).last();
  }
}
