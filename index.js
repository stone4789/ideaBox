var ideaInput = document.querySelector('#title');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('#save-button');
var searchInput = document.querySelector('#search-box');
var ideaList = document.querySelector('#idea-space')
var keyArray = [];

saveButton.addEventListener('click',createNewCard);
window.addEventListener('load', getStorage);

document.querySelector('#idea-space').addEventListener('click',handleCardEvents);


function handleCardEvents(e){
  e.preventDefault();
  var card = e.target.closest('li');
  var key = card.id;
  var object = JSON.parse(localStorage.getItem(key));

  if (e.target.classList.contains("upvote")) {
    localStorage.setItem(key,JSON.stringify(updateQuality(object,1)));
  } else if (e.target.classList.contains("downvote")) {
    localStorage.setItem(key,JSON.stringify(updateQuality(object,-1)));
  } else if (e.target.classList.contains("remove")) {
    var index = keyArray.indexOf(parseInt(key));
    keyArray.splice(index,1);
    localStorage.removeItem(key);
    localStorage.setItem('keyArray',JSON.stringify(keyArray));
  } else if (e.target.hasAttribute('contenteditable')) {
    
  }
  document.querySelector('#idea-space').innerHTML = '';
  getStorage();
}

function getStorage(){
  if (localStorage.keyArray) {
    keyArray = JSON.parse(localStorage.getItem('keyArray'));
    console.log(keyArray);
    //sortCards();
    keyArray.forEach(function(id){
      var card = JSON.parse(localStorage.getItem(id));
      console.log(card)
      renderCard(card);
    });
  }
}

function Card(title,body,id) {
  this.title = title;
  this.body = body;
  this.quality = "swill";
  this.numQuality = 0;
  this.id = id;
}

function updateQuality(obj,n) {
  if (obj.quality === "swill" && n === 1) {
    obj.quality = "plausible";
    obj.numQuality = 1;
  } else if (obj.quality === "plausible" && n === 1) {
    obj.quality = "genius";
    obj.numQuality = 2
  }else if (obj.quality === "genius" && n === -1) {
    obj.quality = "plausible";
    obj.numQuality = 1;
  }else if (obj.quality === "plausible" && n === -1) {
    obj.quality = "swill";
    obj.numQuality = 0;
  }
  return obj;
}

// function sortCards() {
//   keyArray.sort(function (a,b){
//     var obj1 = JSON.parse(localStorage.getItem(a));
//     var obj2 = JSON.parse(localStorage.getItem(b));
//     if (obj1.numQuality > obj2.numQuality) {
//       return -1;
//     } else {
//       return 1;
//     }
//     localStorage.setItem(JSON.stringify(keyArray));
//   })
// }

function createNewCard(e) {
  e.preventDefault();
  var idea = ideaInput.value;
  var body = bodyInput.value;
  var idNumber = Date.now();
  var cardObject = new Card(idea,body,idNumber);

  keyArray.push(idNumber);
  localStorage.setItem('keyArray',JSON.stringify(keyArray));
  localStorage.setItem(idNumber,JSON.stringify(cardObject));

  renderCard(cardObject);
}

function renderCard(newCard) {

  var card = document.createElement('li');
  card.innerHTML = 
    '<li id= "n' +
    newCard.idNumber +
    '" class="idea-card">' +
    '<h2 class="card-title">' + 
      newCard.title + 
    '</h2>' +
    '<button class="remove">' + 
      'x' + 
    '</button>' +
    '<p class="card-body">' + 
      newCard.body + 
    '</p>' +
    '<div class="vote-container">' +
      '<input class="upVote" type="image" src="images/downvote.svg">' +
      '<input class="downVote" type="image" src="images/upvote.svg">' +
      '</button>' +
      '<h5 class="card-quality">quality: ' + 
      newCard.quality + 
      '</h5>' +
    '</div>' +
    '<hr>' +
    '</li>'};

  ideaList.insertBefore(card,ideaList.firstChild);
  document.querySelector('form').reset();
}



