
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
      let spanCat = document.createElement('span');
      let pAdQuest = document.createElement('p');
      let divAdDetails = document.createElement('div');
      let spanReply = document.createElement('button');
      let iReplyCount = document.createElement('button');
      let spanSame = document.createElement('button');
      let iSameCount = document.createElement('button');
      let replyId = data[i].parentId;
      divAdFeed.setAttribute('class', 'w3-white w3-border-bottom w3-padding');
      pAdQuest.setAttribute('id', 'adquest');
      spanCat.setAttribute('class', 'w3-text-indigo w3-large w3-card-4')
      spanReply.setAttribute('id', replyId);
      spanReply.setAttribute('onclick', 'showReply()');
      spanReply.setAttribute('class', 'w3-white');
      spanReply.setAttribute('style', 'border:none');
      iReplyCount.setAttribute('id', 'reply');
      iReplyCount.setAttribute('class', 'w3-light-blue');
      iReplyCount.setAttribute('style', 'border:none');
      spanSame.setAttribute('class', 'w3-right w3-white');
      spanSame.setAttribute('style', 'border:none');
      spanCat.innerHTML = data[i].category
      pAdQuest.innerHTML = data[i].content;
      divAdDetails.appendChild(spanReply);
      divAdDetails.appendChild( iReplyCount);
      divAdDetails.appendChild(spanSame);
      divAdFeed.appendChild(spanCat)
      divAdFeed.appendChild(pAdQuest);
      divAdFeed.appendChild(divAdDetails);
      // iReplyCount.innerHTML = (data.length);
      spanReply.innerText = 'Advice';
      spanSame.innerText = 'Same here';
      spanSame.appendChild(iSameCount);
      iSameCount.innerHTML = data.length;
      iSameCount.setAttribute('id', 'same');
      iSameCount.setAttribute('class', 'w3-badge w3-light-blue');
      iSameCount.setAttribute('style', 'border:none');
      document.getElementById('advicefeed').appendChild(divAdFeed);
    }
  }


const showReply = async() => {
  document.getElementById('replyhere'). innerHTML = ''
  document.getElementById('adreply').style.display = 'block';
  let adId = document.activeElement.id;
  document.getElementById('parentidholder').innerText = adId
  let url = 'http://localhost:3000/advicereply'+ '/'+adId;
  const response = await fetch(url);
  const data = await response.json();
  if (data.length === 0){
    document.getElementById('replyhere').innerHTML = 'No advice here yet. You can post your advice below.';
  }else{
    let table = document.createElement('table');
  table.setAttribute('id', 'replies');
  let row = table.insertRow();
  for(var i=0; i<data.length; i++){
    let cell = row.insertCell();
    cell.innerHTML = data[i].content
    row = table.insertRow();
  };
  document.getElementById('replyhere').appendChild(table);
  }
}

function closeReply(){
  document.getElementById('adreply').style.display = 'none';
  document.getElementById('parentidholder').innerText = '';
}

function postQuestion(){
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

function postAdvice(){
  let replyId = document.getElementById('parentidholder').innerText
  let content = document.getElementById('advtext').value;
  
  let advobj = {
    parentId: replyId,
    content: content
  };
  fetch('http://localhost:3000/advices',{
    headers: { 'Content-Type':'application/json'},
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(advobj)
  });
  document.activeElement.id = 'sendreply';
  document.getElementById('advtext').value = '';
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
