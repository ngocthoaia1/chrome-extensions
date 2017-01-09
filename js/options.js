// Saves options to chrome.storage
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
    restoreHideElementOptions(items.hideElements.domains, items.hideElements.elementTags)
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('hide-iframe').addEventListener('click',
    save_options);
$('#hide-element-checkbox').click(save_options);

function restoreHideElementOptions(domains, elementTags) {
  domains.forEach(() => addHideElementForm());
  $form = $('.hide-element-form');
  $form.find('.domains').map((index, e) => $(e).val(domains[index]));
  $form.find('.element-tags').map((index, e) => $(e).val(elementTags[index]));
}

$('.hide-element-submit').click(function() {
  $form = $('.hide-element-form');
  var domains = [];
  var elementTags = [];
  $form.find('.domains').map((index, e) => domains.push(e.value));
  $form.find('.element-tags').map((index, e) => elementTags.push(e.value));
  chrome.storage.sync.set({
    hideElements: {
      domains: domains,
      elementTags: elementTags
    }
  }, function() {
    // Update status to let user know options were saved.
  });
});

function removeHideElement(e) {
  e.preventDefault();
  $(this).parents('.row').remove()
}

function addHideElementForm() {
  var form = '<div class="row"><br /> \
          <div class="col-md-4 col-sm-6">\
            <input class="domains form-control">\
          </div>\
          <div class="col-md-4 col-sm-6">\
            <textarea class="element-tags form-control"></textarea>\
          </div>\
          <div class="col-md-1 col-sm-1">\
            <a href="#!" class="delete-hide-element">Remove</a>\
          </div>\
        </div>';
  $('.hide-element-form').find('.elements').append(form);
  $('.delete-hide-element').off('click');
  $('.delete-hide-element').click(removeHideElement)
}

$('.add-hide-element').click(addHideElementForm);
