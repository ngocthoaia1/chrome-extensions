function setChromeStorage(key, text) {
  var data = splitTextData(key, text);
  console.log("setChromeStorage", data)
  chrome.storage.sync.set(data, function() {
    // Update status to let user know options were saved.
  });
}

function splitTextData(key, text) {
  var pos = 0;
  var MAX_LENGTH = 300;
  var index = 0;
  var data = {}
  for(; pos < text.length; pos += MAX_LENGTH) {
    data[key + index] = text.substring(pos, pos + MAX_LENGTH)
    index += 1
  }
  data[key] = index - 1;
  return data;
}

function getChromeStorage(key, callback) {
  chrome.storage.sync.get({
    [key]: 0
  }, function(data) {
    var length = data[key]
    console.log(length)
    var syncData = {}
    for(var i = 0; i <= length; i += 1) {
      syncData[key + i] = ""
    }
    chrome.storage.sync.get(syncData, function(dataDetail) {
      var result = ''
      for(i = 0; i <= length; i += 1) {
        result += dataDetail[key + i]
      }
      callback(result)
    });
  });
}
