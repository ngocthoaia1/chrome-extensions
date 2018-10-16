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

function onChangeSelectDomain() {
  var selectedDomain = $("#select-domain").val() || currentDomain;
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].domain === selectedDomain) {
      $('#use-javascript').prop('checked', elements[i].isUsing);
      $('#use-jquery').prop('checked', elements[i].isUsingJquery);
      editor.setValue(elements[i].content || '')
    }
  }
}

function init() {
  elements = JSON.parse(localStorage.getItem('injectJsElements')) || [];
  var selects = [];
  var foundThisDomain = false;
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
}

// Saves options to chrome.storage
function saveForm() {
  isUsing = $('#use-javascript')[0].checked;
  isUsingJquery = $('#use-jquery')[0].checked;
  for (i = 0; i < elements.length; i++) {
    if (elements[i].domain === $("#select-domain").val()) {
      elements[i].content = editor.session.getValue();
      elements[i].isUsing = isUsing;
      elements[i].isUsingJquery = isUsingJquery;
    }
  }

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: elements}, function(response) {
      window.close();
    });
  });

  localStorage.setItem('injectJsElements', JSON.stringify(elements))
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
  });
  $('#cancel').click(function() {window.close();})
});
