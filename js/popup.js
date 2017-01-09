function save_options() {
  var isHideIframe = document.getElementById('hide-iframe').checked;
  var isHideElements = document.getElementById('hide-element-checkbox').checked;
  var isUseGithub = document.getElementById('github-checkbox').checked;
  var isAddReferenceTask = document.getElementById('github-task-title-checkbox').checked;
  var isHideJenkinsComments = document.getElementById('github-hide-jenkins-comments').checked;
  chrome.storage.sync.set({
    isHideIframe: isHideIframe,
    isHideElements: isHideElements,
    isUseGithub: isUseGithub,
    isAddReferenceTask: isAddReferenceTask,
    isHideJenkinsComments: isHideJenkinsComments
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
    hideElements: true,
    isUseGithub: true,
    isAddReferenceTask: true,
    isHideJenkinsComments: true
  }, function(items) {
    document.getElementById('hide-iframe').checked = items.isHideIframe;
    document.getElementById('hide-element-checkbox').checked = items.isHideElements;
    document.getElementById('github-checkbox').checked = items.isUseGithub;
    document.getElementById('github-task-title-checkbox').checked = items.isAddReferenceTask;
    document.getElementById('github-hide-jenkins-comments').checked = items.isHideJenkinsComments;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('hide-iframe').addEventListener('click',
    save_options);

document.getElementById('hide-element-checkbox').addEventListener('click',
  save_options);

document.getElementById('github-checkbox').addEventListener('click',
  save_options);

document.getElementById('github-task-title-checkbox').addEventListener('click',
  save_options);

document.getElementById('github-hide-jenkins-comments').addEventListener('click',
  save_options);

$('.settings-details').click(function(e) {
  e.preventDefault();
  chrome.tabs.create({url: 'chrome-extension://' + chrome.runtime.id + '/html/options.html'});
})
