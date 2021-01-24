chrome.runtime.onMessage.addListener(() => {
  browser.browserAction.onClicked.addListener(() => {
    console.log('Hello from the background');
  });
});
