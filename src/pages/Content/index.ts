console.log('Hello World');

// content-scripts.ts

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
  iframe.allow = ' clipboard-read; clipboard-write';

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

// document.addEventListener('DOMContentLoaded', () => {
//   console.log('DOMContentLoaded');

//   const showButton = function () {
//     console.log('creating button');
//     const button = document.createElement('button');
//     button.textContent = 'Data Web Work';
//     button.style.position = 'fixed';
//     button.style.right = '0';
//     button.style.top = '50%';
//     button.style.zIndex = '99999';
//     button.onclick = openExtension;

//     document.body.appendChild(button);

//     function openExtension() {
//       setTimeout(() => {
//         const copyPhonex = document.querySelector(
//           '#copyPhonex'
//         ) as HTMLButtonElement;
//         if (copyPhonex) {
//           copyPhonex.click();
//           // create the iframe and set its attributes
//           let iframe = document.getElementById(
//             'pancake-extension-iframe'
//           ) as HTMLIFrameElement;

//           if (!iframe) {
//             iframe = document.createElement('iframe');
//             iframe.id = 'pancake-extension-iframe';
//             iframe.src = chrome.runtime.getURL('index.html');
//             iframe.style.width = '33%';
//             iframe.style.height = '100%';
//             iframe.style.position = 'fixed';
//             iframe.style.right = '0';
//             iframe.style.top = '0';
//             iframe.style.zIndex = '100000';
//             iframe.style.border = 'none';
//             iframe.style.backgroundColor = 'white';

//             // replace div#customerCol with iframe
//             // const customerCol = document.getElementById('customerCol');
//             // if (customerCol) {
//             //   customerCol.replaceWith(iframe);
//             // }

//             // append the iframe to the body
//             document.body.appendChild(iframe);

//             // close the iframe when clicking outside
//             document.addEventListener('click', closeExtension);
//           }

//           iframe.style.display = 'block';
//           // get data from clipboard
//           window.navigator.clipboard.readText().then((data) => {
//             console.log({ data });

//             iframe.contentWindow?.postMessage(
//               { type: 'OPEN_EXTENSION', data },
//               '*'
//             );
//           });

//           function closeExtension(event: any) {
//             if (!iframe.contains(event.target) && event.target !== button) {
//               iframe.style.display = 'none';
//             }
//           }
//         }
//       }, 1);
//     }
//   };

//   showButton();
// });
