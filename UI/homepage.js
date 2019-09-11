
function changetheme(){
    var chk = document.getElementById('chk');
    if(chk.checked){
        document.getElementById('main').style.backgroundColor = '#3f5168';
        document.getElementById('fixhead').style.backgroundColor = '#3f5168';
        document.getElementById('catheading').style.color = 'white';
    }else{
        document.getElementById('main').style.backgroundColor = 'royalblue';
        document.getElementById('fixhead').style.backgroundColor = 'royalblue';
        document.getElementById('catheading').style.color = 'azure';
    }
}

const askchangetheme = () => {
  var askchk = document.getElementById('askchk');
    if(askchk.checked){
        document.getElementById('askfixhead').style.backgroundColor = '#3f5168';
        document.getElementById('askmain').style.backgroundColor = '#3f5168';
        document.getElementById('askwrap').style.backgroundColor = 'inherit';
        document.getElementById('bodydiv').style.backgroundColor = '#3f5168';
        
    }else{
        document.getElementById('askmain').style.backgroundColor = 'royalblue';
        document.getElementById('askfixhead').style.backgroundColor = 'darkblue';
        document.getElementById('askwrap').style.backgroundColor = 'rgb(38, 59, 175)'
        document.getElementById('bodydiv').style.backgroundColor = 'royalblue';
        
    }
}

  function w3_open() {
    // document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.width = "30%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
  }
  function w3_close() {
    // document.getElementById("main").style.marginLeft = "0%";
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
    document.getElementById('advicefeed').innerHTML = '';
    const response = await fetch('https://advicemedotorg.herokuapp.com/question');
    const data = await response.json();
    
    for (var i=0; i<data.length; i++){
      let divAdFeed = document.createElement('div');
      let spanCat = document.createElement('span');
      let pAdQuest = document.createElement('p');
      let divAdDetails = document.createElement('div');
      let spanReply = document.createElement('button');
      let iReplyCount = document.createElement('button');
      let spanSame = document.createElement('span');
      let iSameCount = document.createElement('button');
           let replyId = data[i].parentId;
      let questId = data[i]._id;
      divAdFeed.setAttribute('class', 'w3-white w3-border-bottom w3-padding');
      pAdQuest.setAttribute('id', 'adquest');

      spanCat.setAttribute('class', 'w3-text-indigo w3-large w3-card-4');
      spanReply.setAttribute('id', replyId);
      spanReply.setAttribute('onclick', 'showReply()');
      spanReply.setAttribute('class', ' w3-white material-icons');
      spanReply.setAttribute('style', 'border:none');
      iReplyCount.setAttribute('id', 'reply');
      iReplyCount.setAttribute('class', 'w3-white');
      iReplyCount.setAttribute('style', 'border:none');
      spanSame.setAttribute('class', 'w3-white w3-right material-icons');
      spanSame.setAttribute('style', 'border:none');
      spanSame.setAttribute('id', questId);
      spanSame.setAttribute('onclick', 'loadSameCount()');
      spanCat.innerHTML = data[i].category;
      pAdQuest.innerHTML = data[i].content;
      divAdDetails.appendChild(spanReply);
      divAdDetails.appendChild( iReplyCount);
      divAdDetails.appendChild(spanSame);
      divAdFeed.appendChild(spanCat)
      divAdFeed.appendChild(pAdQuest);
      divAdFeed.appendChild(divAdDetails);
      // iReplyCount.innerHTML = (data.length);
      spanReply.innerText = 'message';
      spanSame.innerText = 'favorite';
      spanSame.appendChild(iSameCount);
      let sam = data[i].same;
      if (sam.length>3){
        iSameCount.innerText = '1k+';
      }else if(sam.length>2){
        iSameCount.innerText = '1h+';
      }else{
        iSameCount.innerText = sam;
      }
      iReplyCount.innerHTML = '';
      iSameCount.setAttribute('id', 'same');
      iSameCount.setAttribute('class', 'w3-right w3-badge w3-red w3-small');
      iSameCount.setAttribute('style', 'border:none; font-size:5px');
      document.getElementById('advicefeed').appendChild(divAdFeed);
      document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
    }
  }


  function loadSameCount(){
    let sameId = document.activeElement.id;
    let currentEl = document.activeElement.firstElementChild;
    let sameValue = (parseInt(currentEl.innerHTML) + 1).toString();
    let objsame = {
      same:sameValue,
    };
    let url = 'https://advicemedotorg.herokuapp.com/samehere'+ '/'+sameId;
    fetch(url,{
    headers: { 'Content-Type':'application/json'},
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(objsame)
  });
  location.reload()
    // alert(sameValue);
  }

const showReply = async() => {
  document.getElementById('replyhere'). innerHTML = ''
  document.getElementById('adreply').style.display = 'block';
  document.getElementById('advicefeed').style.display = 'none';
  let adId = document.activeElement.id;
  document.getElementById('parentidholder').innerText = adId
  let url = 'https://advicemedotorg.herokuapp.com/advicereply'+ '/'+adId;
  document.getElementById('iupdate').innerText = url;
  const response = await fetch(url);
  const data = await response.json();
  if (data.length === 0){
    document.getElementById('replyhere').innerHTML = 'No advice here yet. You can post your advice below.';
  }else{
    let table = document.createElement('table');
    table.setAttribute('id', 'replies');
    table.setAttribute('class', 'w3-text-white')
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
  document.activeElement.id = 'sendreply';;
  document.getElementById('advicefeed').style.display = 'block';
  // location.reload();
  // document.getElementById('advtext').setAttribute('placeholder', 'What\'s your advice (128 chr)');
}

function postQuestion(){
  let category = document.getElementById('cate').value;
  let adQuestion = document.getElementById('askadv').value;
  let same = '0';
  if(!category || !adQuestion){
    document.getElementById('msg').style.color = 'yellow';
    document.getElementById('msg').style.backgroundColor = 'red';
    document.getElementById('msg').innerHTML = '*Fill all required fields';
  }else{
  let problem = {
    category: category,
    content: adQuestion,
    same: same
  };
  fetch('https://advicemedotorg.herokuapp.com/question',{
    headers: { 'Content-Type':'application/json'},
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(problem)
  });
  document.getElementById('msg').style.color = 'white' ;
  document.getElementById('msg').innerHTML = 'Your Question has been posted check back soon for advice';
  document.getElementById('submitquest').style.display = 'none';
  document.getElementById('refreshsubmit').style.display = 'block';
  // document.getElementById('msg').innerHTML = document.getElementById('cate').value;
}
}

function refreshAsk(){
  location.reload();
}

const postAdvice = async() => {
  document.getElementById('replyhere').innerHTML = ''
  let replyId = document.getElementById('parentidholder').innerText
  let content = document.getElementById('advtext').value;

  if(content == ''){
    document.getElementById('advtext').style.color='red';
    document.getElementById('advtext').value= 'Can not post empty reply';
  }else{
  let advobj = {
    parentId: replyId,
    content: content
  };
  const response = await fetch('https://advicemedotorg.herokuapp.com/advices',{
    headers: { 'Content-Type':'application/json'},
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(advobj)
  })
  let geturl = document.getElementById('iupdate').innerText;
  const updateresp = await fetch(geturl);
  const data = await updateresp.json();
  let table = document.createElement('table');
  table.setAttribute('id', 'replies');
  table.setAttribute('style', 'background-color:inherit');
  table.setAttribute('class', 'w3-text-white');
  let row = table.insertRow();
  for(var i=0; i<data.length; i++){
    let cell = row.insertCell();
    cell.innerHTML = data[i].content
    row = table.insertRow();
};
document.getElementById('replyhere').appendChild(table);
document.getElementById('advtext').value = '';
};
// location.reload();
};


function textCase(){
  let cateText = document.getElementById('cate').value;
  let part1 = cateText.charAt(0).toUpperCase();
  let part2 = cateText.slice(1);
  document.getElementById('cate').value = part1+part2;
  
}


const selectFaith = async() => {
  document.getElementById('advicefeed').innerHTML = '';
  const response = await fetch('https://advicemedotorg.herokuapp.com/questioncat/Faith');
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
    let questId = data[i]._id;
    divAdFeed.setAttribute('class', 'w3-white w3-border-bottom w3-padding');
    pAdQuest.setAttribute('id', 'adquest');

    spanCat.setAttribute('class', 'w3-text-indigo w3-large w3-card-4');
    spanReply.setAttribute('id', replyId);
    spanReply.setAttribute('onclick', 'showReply()');
    spanReply.setAttribute('class', 'w3-light-blue');
    spanReply.setAttribute('style', 'border:none');
    iReplyCount.setAttribute('id', 'reply');
    iReplyCount.setAttribute('class', 'w3-light-blue');
    iReplyCount.setAttribute('style', 'border:none');
    spanSame.setAttribute('class', 'w3-right w3-light-blue');
    spanSame.setAttribute('style', 'border:none');
    spanSame.setAttribute('id', questId);
    spanSame.setAttribute('onclick', 'loadSameCount()');
    spanCat.innerHTML = data[i].category;
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
    let sam = data[i].same;
    if (sam.length>3){
      iSameCount.innerHTML = '1k+';
    }else if(sam.length>2){
      iSameCount.innerHTML = '1h+';
    }else{
      iSameCount.innerHTML = sam;
    }
    iReplyCount.innerHTML = '';
    iSameCount.setAttribute('id', 'same');
    iSameCount.setAttribute('class', 'w3-badge w3-red w3-small');
    iSameCount.setAttribute('style', 'border:none');
    document.getElementById('advicefeed').appendChild(divAdFeed);
    document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
  }
}

const selectLove = async() => {
  document.getElementById('advicefeed').innerHTML = '';
  const response = await fetch('https://advicemedotorg.herokuapp.com/questioncat/Love');
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
    let questId = data[i]._id;
    divAdFeed.setAttribute('class', 'w3-white w3-border-bottom w3-padding');
    pAdQuest.setAttribute('id', 'adquest');

    spanCat.setAttribute('class', 'w3-text-indigo w3-large w3-card-4');
    spanReply.setAttribute('id', replyId);
    spanReply.setAttribute('onclick', 'showReply()');
    spanReply.setAttribute('class', 'w3-light-blue');
    spanReply.setAttribute('style', 'border:none');
    iReplyCount.setAttribute('id', 'reply');
    iReplyCount.setAttribute('class', 'w3-light-blue');
    iReplyCount.setAttribute('style', 'border:none');
    spanSame.setAttribute('class', 'w3-right w3-light-blue');
    spanSame.setAttribute('style', 'border:none');
    spanSame.setAttribute('id', questId);
    spanSame.setAttribute('onclick', 'loadSameCount()');
    spanCat.innerHTML = data[i].category;
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
    let sam = data[i].same;
    if (sam.length>3){
      iSameCount.innerHTML = '1k+';
    }else if(sam.length>2){
      iSameCount.innerHTML = '1h+';
    }else{
      iSameCount.innerHTML = sam;
    }
    iReplyCount.innerHTML = '';
    iSameCount.setAttribute('id', 'same');
    iSameCount.setAttribute('class', 'w3-badge w3-red w3-small');
    iSameCount.setAttribute('style', 'border:none');
    document.getElementById('advicefeed').appendChild(divAdFeed);
    document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
  }
}

const displayCatDiv = ()=> {
  document.getElementById('showcategory').style.display = 'block';
  document.getElementById('catheading').style.display = 'none';
}

const selectEdu = async() => {
  document.getElementById('advicefeed').innerHTML = '';
  const response = await fetch('https://advicemedotorg.herokuapp.com/questioncat/Education');
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
    let questId = data[i]._id;
    divAdFeed.setAttribute('class', 'w3-white w3-border-bottom w3-padding');
    pAdQuest.setAttribute('id', 'adquest');

    spanCat.setAttribute('class', 'w3-text-indigo w3-large w3-card-4');
    spanReply.setAttribute('id', replyId);
    spanReply.setAttribute('onclick', 'showReply()');
    spanReply.setAttribute('class', 'w3-light-blue');
    spanReply.setAttribute('style', 'border:none');
    iReplyCount.setAttribute('id', 'reply');
    iReplyCount.setAttribute('class', 'w3-light-blue');
    iReplyCount.setAttribute('style', 'border:none');
    spanSame.setAttribute('class', 'w3-right w3-light-blue');
    spanSame.setAttribute('style', 'border:none');
    spanSame.setAttribute('id', questId);
    spanSame.setAttribute('onclick', 'loadSameCount()');
    spanCat.innerHTML = data[i].category;
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
    let sam = data[i].same;
    if (sam.length>3){
      iSameCount.innerHTML = '1k+';
    }else if(sam.length>2){
      iSameCount.innerHTML = '1h+';
    }else{
      iSameCount.innerHTML = sam;
    }
    iReplyCount.innerHTML = '';
    iSameCount.setAttribute('id', 'same');
    iSameCount.setAttribute('class', 'w3-badge w3-red w3-small');
    iSameCount.setAttribute('style', 'border:none');
    document.getElementById('advicefeed').appendChild(divAdFeed);
    document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
  }
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

  //   fetch('https://advicemedotorg.herokuapp.com/question', option)
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

  // function postAdvice(){
//   let replyId = document.getElementById('parentidholder').innerText
//   let content = document.getElementById('advtext').value;
  
//   let advobj = {
//     parentId: replyId,
//     content: content
//   };
//   fetch('https://advicemedotorg.herokuapp.com/advices',{
//     headers: { 'Content-Type':'application/json'},
//     method: 'POST',
//     mode: 'cors',
//     body: JSON.stringify(advobj)
//   });
//   document.getElementById('replyhere').appendChild(table);
//   document.getElementById('advtext').value = '';
  
// }