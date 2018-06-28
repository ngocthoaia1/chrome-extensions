getChromeStorage('elements', function(text) {
  if (text) {
    elements = JSON.parse(text)
  } else {
    elements = [{domain: 'Tất cả các trang'}]
  }
  if (localStorage.getItem('showElements')) {
    console.log(JSON.stringify(elements));
  }
  try {
    executeElements(elements);
  }
  catch(err) {
    console.log('hide elements errors');
    console.log(err);
  }
});

function executeElements(elements) {
  elements.forEach((e, index) => {
    if (e.isUsing && (e.domain.indexOf(location.hostname) !== -1 || e.domain === 'Tất cả các trang')) {
      script = document.createElement("script");
      script.innerHTML = e.content;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  });
}
