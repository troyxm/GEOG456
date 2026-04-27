function myFunction(e) {
    console.log(e)
    document.getElementById("middle").style.opacity = e / 50;
    document.getElementById("after").style.opacity = (e-50) / 50;
    


}
