
function changetheme(){
    var chk = document.getElementById('chk');
    if(chk.checked){
        document.getElementById('main').style.backgroundColor = 'grey';
        document.getElementById('heading').style.color = 'white';
    }else{
        document.getElementById('main').style.backgroundColor = 'royalblue';
        document.getElementById('heading').style.color = 'azure';
    }
}

function w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
  }
  function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
  }

  function startTime(){
      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      let s = today.getSeconds();
      m = checkTime(m);
      s = checkTime(s);
      document.getElementById('tym').innerHTML = h + ":" + m + ":" + s;
      let t = setTimeout(startTime, 500);
  };

  function checkTime(i){
    if(i<10){i = "0" + 1}
    return i;
  };