$(function() {
  chrome.storage.sync.get({
    isHideIframe: true
  }, function(items) {
    if (items.isHideIframe) {
      hideIframe();
    } else {
      showIframe();
    }
  });
});

function hideIframe() {
  // $('iframe').hide();
}

function showIframe() {
  $('iframe').addClass('show-iframe')
}
