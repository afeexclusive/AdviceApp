
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
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.width = "30%";
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

  
  const loadAdvice = async() => {
    const response = await fetch('http://localhost:3000/question');
    const data = await response.json();
    
    for (var i=0; i<data.length; i++){
      let divAdFeed = document.createElement('div');
      let pAdQuest = document.createElement('p');
      let divAdDetails = document.createElement('div');
      let spanReply = document.createElement('span');
      let iReplyCount = document.createElement('i');
      let spanSame = document.createElement('span');
      let iSameCount = document.createElement('i');
      let replyId = data[i].parentId;
      divAdFeed.setAttribute('class', 'w3-white w3-border-bottom w3-padding');
      pAdQuest.setAttribute('id', 'adquest');
      spanReply.setAttribute('id', replyId);
      spanReply.setAttribute('onclick', 'showReply()')
      iReplyCount.setAttribute('id', 'reply');
      iReplyCount.setAttribute('class', 'w3-badge w3-green');
      spanSame.setAttribute('class', 'w3-right');
      pAdQuest.innerHTML = data[i].content;
      spanReply.appendChild(iReplyCount);
      divAdDetails.appendChild(spanReply);
      divAdDetails.appendChild(spanSame);
      divAdFeed.appendChild(pAdQuest);
      divAdFeed.appendChild(divAdDetails);
      iReplyCount.innerHTML = (data.length);
      spanReply.insertAdjacentText('beforebegin', 'Advice');
      spanSame.innerText = 'Same here';
      spanSame.appendChild(iSameCount);
      iSameCount.insertAdjacentText('afterend', data.length);
      iSameCount.setAttribute('id', 'same');
      iSameCount.setAttribute('class', 'w3-badge w3-green');
      document.getElementById('advicefeed').appendChild(divAdFeed);
    }
  }

const showReply = async() => {
  document.getElementById('replyhere'). innerHTML = ''
  let adId = document.activeElement.id;
  let url = 'http://localhost:3000/advices/'+ adId;
  document.getElementById('adreply').style.display = 'block';
  const response = await fetch(url);
  const data = await response.json();
  let table = document.createElement('table');
  table.setAttribute('id', 'replies');
  let row = table.insertRow();
  for(var i=0; i<data.length; i++){
    let cell = row.insertCell();
    cell.innerHTML = data[i].content
    row = table.insertRow();
  }
  document.getElementById('replyhere').appendChild(table)
}

function closeReply(){
  document.getElementById('adreply').style.display = 'none';
}

function postAdvice(){
  let category = document.getElementById('cate').value;
  let adQuestion = document.getElementById('askadv').value

  let problem = {
    category: category,
    content: adQuestion
  };
  fetch('http://localhost:3000/question',{
    headers: { 'Content-Type':'application/json'},
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(problem)
  });
  document.getElementById('msg').innerHTML = 'Your Question has been posted check back soon for advice'
}































// let table = document.createElement('table');
//       table.setAttribute('class', 'w3-table w3-bordered w3-striped');
      
//       let row = table.insertRow();
//       for (var i=0; i<data.length; i++){
//         let cell1 = row.insertCell();
//         cell1.innerHTML = data[i].content;
//         cell1.setAttribute('id', data[i].id);
//         row = table.insertRow();
//         let cell2 = row.insertCell();
//         cell2.innerHTML = ('<i><i class="w3-badge w3-green" id="reply"></i>Advice</i>');
//         row = table.insertRow();
//       };



// function loadAdvice(){
  //   const option = {
  //     headers: {'Content-Type': 'application/json'},
  //     method: 'GET',
  //     mode: 'no-cors', //cors, same-origin, no-cors
  //   }

  //   fetch('http://localhost:3000/question', option)
  //   .then(response => response.json())
  //   .then((data) => {
  //     let table = document.createElement('table');
  //     table.setAttribute('class', 'w3-table w3-bordered w3-striped');
  //     let row = table.insertRow();
  //     for (var i=0; i<data.length; i++){
  //       let cell1 = row.insertCell();
  //       cell1.innerHTML = data[i].content
  //       cell1.setAttribute('id', data[i].id)
  //     }
  //   });
  // };
