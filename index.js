var ideaInput = document.querySelector('#title');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('#save-button');
var searchInput = document.querySelector('#search-box');
var ideaList = document.querySelector('#idea-space')
var ideaArray = [];

saveButton.addEventListener('click',createNewCard);
window.addEventListener('load', getStorage);


//document.querySelector('.upvote').addEventListener('click',updateQuality(1));
document.querySelector('#idea-space').addEventListener('click',function(e){
  if (e.target.classList.contains("upvote")) {
    updateQuality(e.target,1);
  } else if (e.target.classList.contains("downvote")) {
    //updateQuality(-1);
  }
})



function store(arr) {
  localStorage.setItem('data',JSON.stringify(arr));
}

function getStorage(){
  if (localStorage.data) {
    ideaArray = JSON.parse(localStorage.getItem('data'));
    ideaArray.forEach(function(obj){
      renderCard(obj);
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

Card.prototype.updateQuality = function(element,n) {
  if (element.quality === "swill" && n === 1) {
    this.quality = "decent";
    this.numQuality = 1;
  } else if (this.quality === "decent" && n === 1) {
    this.quality = "excellent";
    this.numQuality = 2
  }else if (this.quality === "excellent" && n === -1) {
    this.quality = "decent";
    this.numQuality = 1;
  }else if (this.quality === "decent" && n === -1) {
    this.quality = "swill";
    this.numQuality = 0;
  }
  sortCards();
}

function sortCards() {
  ideaArray.sort(function (a,b){
    if (a.numQuality > b.numQuality) {
      return 1;
    } else {
      return -1;
    }
  })
  ideaArray.forEach(function(obj){
    renderCard(obj);
  });
  store(ideaArray);
}

function createNewCard(e) {
  e.preventDefault();
  var idea = ideaInput.value;
  var body = bodyInput.value;
  var idNumber = Date.now();
  var cardObject = new Card(idea,body,idNumber);
  ideaArray.push(cardObject);
  console.log(idNumber);
  store(ideaArray);
  renderCard(cardObject);
}

function renderCard(newCard) {

  var card = document.createElement('li');
  card.innerHTML = 
    '<li id= "n' +
    newCard.id +
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
      '<button class="upvote">' +
      '&#8593;' +
      '</button>' +
      '<button class="downvote">' +
      '&#8595;' +
      '</button>' +
      '<h5 class="card-quality">quality: ' + 
      newCard.quality + 
      '</h5>' +
    '</div>' +
    '<hr>'
    '</li>';

  ideaList.appendChild(card);
  document.querySelector('form').reset();
}

  //addToLocalStorage();













