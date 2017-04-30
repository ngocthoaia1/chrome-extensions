var editor = ace.edit("editor");
function update() {
    var shouldShow = !editor.session.getValue().length;
    var node = editor.renderer.emptyMessageNode;
    if (!shouldShow && node) {
        editor.renderer.scroller.removeChild(editor.renderer.emptyMessageNode);
        editor.renderer.emptyMessageNode = null;
    } else if (shouldShow && !node) {
        node = editor.renderer.emptyMessageNode = document.createElement("div");
        node.textContent = "Nhập đoạn javascript vào đây ..."
        node.className = "ace_invisible ace_emptyMessage"
        node.style.padding = "0 9px"
        editor.renderer.scroller.appendChild(node);
    }
}

elements = [];

onChangeSelectDomain = function () {
  selectedDomain = $("#select-domain").val() || currentDomain;
  console.log(elements);
  for (i = 0; i < elements.length; i++) {
    if (elements[i].domain === selectedDomain) {
      $('#use-javascript').prop('checked', elements[i].isUsing);
      editor.setValue(elements[i].content)
    }
  }
}

function init() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    elements: [{domain: 'Tất cả các trang'}]
  }, function(items) {
    elements = items.elements;
    selects = [];
    foundThisDomain = false;
    for (i = 0; i < elements.length; i++) {
      domain = elements[i].domain;
      if (domain === currentDomain) {
        foundThisDomain = true;
        option = '<option value="' + domain + '" selected>' + domain + '</option>';
      } else {
        option = '<option value="' + domain + '">' + domain + '</option>';
      }
      selects.push(option);
    }
    if (!foundThisDomain) {
      option = '<option value="' + window.currentDomain + '" selected>' + window.currentDomain + '</option>';
      elements.push({domain: currentDomain});
      selects.push(option);
    }
    $('#select-domain').append(selects);
    onChangeSelectDomain();
  });
}

// Saves options to chrome.storage
function saveForm() {
  isUsing = $('#use-javascript')[0].checked;
  foundThisDomain = false
  for (i = 0; i < elements.length; i++) {
    if (elements[i].domain === $("#select-domain").val()) {
      elements[i].content = editor.session.getValue();
      elements[i].isUsing = isUsing;
      foundThisDomain = true
    }
  }
  chrome.storage.sync.set({
    elements: elements
  }, function() {
    // Update status to let user know options were saved.
  });
}

currentDomain = null;
chrome.tabs.getSelected(null, function(tab) {
    editor.on("input", update);
    update();

    url = tab.url;
    currentDomain = url.split("/")[0] + "//" + url.split("/")[2];
    init();
    $('#select-domain').on('change', onChangeSelectDomain);
    $('#submit').click(function() {
      saveForm();
      var code = 'window.location.reload();';
      chrome.tabs.executeScript(tab.id, {code: code});
    });
    $('#cancel').click(function() {window.close();})

});
