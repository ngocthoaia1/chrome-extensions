$(function() {
  chrome.storage.sync.get({
    isHideElements: true,
    hideElements: true
  }, function(items) {
    if (items.isHideElements) {
      try {
        hideElements(items.hideElements);
      }
      catch(err) {
        console.log('hide elements errors');
      }
    }
  });
});

function hideElements(elements) {
  var elementTags = elements.elementTags;
  elements.domains.forEach((e, index) => {
    if (e.toString().indexOf(location.hostname) !== -1) {
      tags = elementTags[index];
      $(tags).hide()
    }
  });
}
