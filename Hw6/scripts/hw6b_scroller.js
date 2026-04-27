var maxY =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;
// The previous is a good way of calculating the maximum vertical scrolling.

window.onscroll = function () {
  myFunction();
}; // when you scroll the myFunction will be called.

// myFunction changes the opacity of the image based on the scroll
function myFunction() {
  var opacity = window.scrollY / maxY;
  document.getElementById("middle").style.opacity = opacity / 0.5;
  document.getElementById("after").style.opacity = (opacity - 0.5) / 0.5;
  // I added this next line so you can see the values generated when you scroll displayed on the page.
 
}