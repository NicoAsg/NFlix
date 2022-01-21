let pages = document.getElementsByClassName("pagination")[0].getElementsByTagName("li")
return parseInt(pages[pages.length - 2].innerText)