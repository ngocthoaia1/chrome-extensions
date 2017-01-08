// Saves options to chrome.storage
function save_options() {
  var isHideIframe = document.getElementById('hide-iframe').checked;
  chrome.storage.sync.set({
    isHideIframe: isHideIframe
  }, function() {
    // Update status to let user know options were saved.
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    isHideIframe: true
  }, function(items) {
    document.getElementById('hide-iframe').checked = items.isHideIframe;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('hide-iframe').addEventListener('click',
    save_options);
