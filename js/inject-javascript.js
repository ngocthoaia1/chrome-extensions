chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  var elements = request.data || [];
  localStorage.setItem('injectJsElements', JSON.stringify(elements));
  window.location.reload();
});

var elements = JSON.parse(localStorage.getItem('injectJsElements')) || [];

function executeElements() {
  elements.forEach((e, index) => {
    if (e.isUsing && (e.domain.indexOf(location.hostname) !== -1 || e.domain === 'Tất cả các trang')) {
      if (e.isUsingJquery) {
        script = document.createElement("script");
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
        document.getElementsByTagName("head")[0].appendChild(script);
      }

      script = document.createElement("script");
      script.innerHTML = e.content;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  });
}

setTimeout(executeElements, 100);
