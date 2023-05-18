(() => {
  function waitForElement(
    selector: string,
    callback: (element: Element) => void
  ) {
    const element = document.querySelector(selector);

    if (element) {
      callback(element);
    } else {
      setTimeout(() => {
        waitForElement(selector, callback);
      }, 500);
    }
  }

  function injectIframe() {
    // Create an iframe and set its source to the extension's index.html
    const iframe = document.createElement('iframe');
    iframe.id = 'pancake-extension-iframe';
    iframe.src = chrome.runtime.getURL('sidebar.html');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.zIndex = '1000';
    iframe.allow = 'clipboard-read; clipboard-write';

    // Add the iframe on top of the content of the div#customerCol
    waitForElement('#customerCol', (customerCol) => {
      (customerCol as HTMLDivElement).style.position = 'relative';

      // Set the display property of the first direct child of div#customerCol to 'none'
      if (customerCol.firstChild) {
        (customerCol.firstChild as HTMLElement).style.display = 'none';
      }
      customerCol.appendChild(iframe);
    });
  }

  // Inject the iframe when the content script is loaded
  injectIframe();
})();
