chrome.storage.sync.get({
  elements: []
}, function(items) {
  elements = items.elements;
  try {
    executeElements(elements);
  }
  catch(err) {
    console.log('hide elements errors');
    console.log(err);
  }
});

function executeElements(elements) {
  var elementTags = elements.elementTags;
  elements.forEach((e, index) => {
    if (e.isUsing && (e.domain.indexOf(location.hostname) !== -1 || e.domain === 'Tất cả các trang')) {
      script = document.createElement("script");
      script.innerHTML = e.content;
      ($("head") || $("body")).append(script);
    }
  });
}
