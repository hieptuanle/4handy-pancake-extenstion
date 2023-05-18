console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (details.url.includes('recent_orders')) {
      // url has type "https://pages.fm/api/v1/pages/1867950093495841/conversations/1867950093495841_6349422001805185/messages/recent_orders?customer_id=4bd5bc20-d5b9-400a-bb35-6cd7009209a3&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI3Y2JmZWFiZi0wNGM1LTRmZWMtOGE0OC0xNjVkOGUyMDQ3ZjAiLCJpYXQiOjE2ODQxNDY5MTcsImZiX25hbWUiOiJIaeG7h3AgVHXhuqVuIEzDqiIsImZiX2lkIjoiMTAxNTM4MDk5NDkxMzM4NzMiLCJleHAiOjE2OTE5MjI5MTd9.AVUv5Q5ejTsq8iozOBPSqiw2ovUPhZsV-FsuaEoU04w"
      // matching url: "https://pages.fm/api/v1/pages/*/conversations/*_*/messages/recent_orders?customer_id=*&access_token=*"
      // get page_id, conversation_id, customer_id, access_token

      const url = new URL(details.url);
      const pageId = url.pathname.split('/')[4];
      const conversationId = url.pathname.split('/')[6];
      const customerId = url.searchParams.get('customer_id');
      const accessToken = url.searchParams.get('access_token');
      const tabId = details.tabId;

      console.log(`SEND MESSAGE TO TAB ID ${tabId}`);
      chrome.tabs
        .sendMessage(tabId, {
          type: 'GET_RECENT_ORDERS',
          data: {
            pageId,
            conversationId,
            customerId,
            accessToken,
          },
        })
        .catch((err) => {
          if (
            err.message ===
            'Could not establish connection. Receiving end does not exist.'
          ) {
            console.log('NO LISTENER');
          }
        });
    }
  },
  {
    urls: ['*://pages.fm/*'],
  }
);
