// Disable eslint errors about Puppeteer globals (e.g. page) being undefined.
/* eslint no-undef: "off" */

const path = require('path');

describe('My Component', () => {
  beforeEach(async () => {
    const fixtureDir = path.resolve(__dirname, 'fixtures');
    await page.goto(`file://${path.resolve(fixtureDir, 'my_component.html')}`);
  });

  it('Exists in memory.', async () => {
    const result = await page.evaluate(() => {
      return VHL.MyComponent.MyComponent;
    });
    expect(result).toBeDefined();
  });

  it('Has the demo text.', async () => {
    const result = await page.evaluate(() => {
      const component = document.querySelector('my-component');
      const text = component.shadowRoot.querySelector('p').innerText;
      return text;
    });
    expect(result).toEqual('I am a component!');
  });

  it('Inherits custom properties.', async () => {
    const result = await page.evaluate(() => {
      const style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.innerHTML = 'body { --bg-color: #f00; }';
      document.head.appendChild(style);

      const component = document.querySelector('my-component');
      const paragraph = component.shadowRoot.querySelector('p');
      return window.getComputedStyle(paragraph).backgroundColor;
    });
    expect(result).toEqual('rgb(255, 0, 0)');
  });
});

