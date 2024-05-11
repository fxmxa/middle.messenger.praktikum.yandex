import { JSDOM } from 'jsdom';
import xhr2 from 'xhr2';

const jsdom = new JSDOM('<body><div id="app"></div></body>', {
  url: 'https://example.org',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Element = jsdom.window.Element;
global.XMLHttpRequest = xhr2;
