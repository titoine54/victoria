import { VictoriaAppPage } from './app.po';

describe('victoria-app App', () => {
  let page: VictoriaAppPage;

  beforeEach(() => {
    page = new VictoriaAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
