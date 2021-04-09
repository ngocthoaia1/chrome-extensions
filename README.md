### Chrome extensions
https://chrome.google.com/webstore/detail/inject-javascripts-to-pag/bajflphdffljmadmeolfhedfphhiedgd?hl=en&authuser=0
### Inject css
```
style = document.createElement("style")
style.innerHTML = "your css here"
head = document.getElementsByTagName("head")[0]
head.appendChild(style)
```

### Inject js when document ready
```
yourFunction = function() {}
window.addEventListener("load", yourFunction)
```
