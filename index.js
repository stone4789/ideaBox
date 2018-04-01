var ideaInput = document.querySelector('#title');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('#save-button');
var searchInput = document.querySelector('#search-box');
var ideaList = document.querySelector('#idea-space')
var ideaCount = 0;

saveButton.addEventListener('click',createNewCard);
 
function Card(title,body,id) {
  this.title = title;
  this.body = body;
  this.quality = "swill";
  this.id = id;
}

Card.prototype.updateQuality = function(n) {
  if (this.quality === "swill" && n === 1) {
    this.quality = "decent";
  } else if (this.quality === "decent" && n === 1) {
    this.quality === "excellent";
  }else if (this.quality === "excellent" && n === -1) {
    this.quality === "decent";
  }else if (this.quality === "decent" && n === -1) {
    this.quality = "swill";
  }
}

function createNewCard(e) {
  e.preventDefault();

  var idea = ideaInput.value;
  var body = bodyInput.value;
  var idNumber = ideaCount;
  var newCard = new Card(idea,body,idNumber);

  var card = document.createElement('li');
  card.innerHTML = 
    '<li class="idea-card">' +
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
  //clearInputs();
  //addToLocalStorage();


}










