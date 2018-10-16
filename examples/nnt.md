#### https://ouo.press, http://ouo.io
```
style = document.createElement("style")
style.innerHTML = "ins, .mgbox, .adsbygoogle {display: none !important;}"
head = document.getElementsByTagName("head")[0]
head.appendChild(style)

window.open = function(){}

enableButton = function() {
  document.getElementById("btn-main").className="btn btn-main"
}

setTimeout(enableButton, 500)
setTimeout(enableButton, 1000)
setTimeout(enableButton, 2000)
```
