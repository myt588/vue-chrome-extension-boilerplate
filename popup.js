let openReinz = document.getElementById('openReinz');

openReinz.onclick = function(element) {
  var newURL = "https://system.reins.jp/";
  chrome.tabs.create({ url: newURL });
};

let copyItem = document.getElementById('copyItem');

copyItem.onclick = function() {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: 'var s = document.documentElement.outerHTML; chrome.runtime.sendMessage({action: "getSource", source: s});' }
    );
  });
}

let spans = [];

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    this.pageSource = request.source;
    let parser = new DOMParser();
    let doc = parser.parseFromString(pageSource, "text/html");
    spans = doc.getElementsByTagName("span");
    for (var i = 0; i < spans.length; i++) {
      const title = spans[i].innerHTML;
      if (title === "賃料") {
        const value = spans[i].parentElement.nextElementSibling.children[0].textContent;
        console.log(value);
      }
    }
  }
});
