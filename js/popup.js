function save_options() {
  var isHideIframe = document.getElementById('hide-iframe').checked;
  var isHideElements = document.getElementById('hide-element-checkbox').checked;
  chrome.storage.sync.set({
    isHideIframe: isHideIframe,
    isHideElements: isHideElements
  }, function() {
    // Update status to let user know options were saved.
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    isHideIframe: true,
    isHideElements: true,
    hideElements: true
  }, function(items) {
    document.getElementById('hide-iframe').checked = items.isHideIframe;
    document.getElementById('hide-element-checkbox').checked = items.isHideElements;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('hide-iframe').addEventListener('click',
    save_options);

document.getElementById('hide-element-checkbox').addEventListener('click',
  save_options);

$('#hide-element-settings').click(function(e) {
  e.preventDefault();
  chrome.tabs.create({url: 'chrome-extension://' + chrome.runtime.id + '/html/options.html'});
})
