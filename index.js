var ideaInput = document.querySelector('#title');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('#save-button');
var sortButton = document.querySelector('#sort-button');
var searchInput = document.querySelector('#search-box');
var ideaList = document.querySelector('#idea-space')
var keyArray = [];

window.addEventListener('load', getStorage);
saveButton.addEventListener('click',createNewCard);
sortButton.addEventListener('click',sortCards);
ideaList.addEventListener('click',handleCardEvents);
ideaList.addEventListener('keyup',updateText);
searchInput.addEventListener('keyup',filterCards);

function handleCardEvents(e){
  var key = e.target.closest('li').id;
  var idea = JSON.parse(localStorage.getItem(key));
  if (e.target.classList.contains("upvote")) {
    store(key, updateQuality(idea, 1, key));
  } else if (e.target.classList.contains("downvote")) {
    store(key, updateQuality(idea, -1, key));
  } else if (e.target.classList.contains("remove")) {
    var index = keyArray.indexOf(parseInt(key));
    keyArray.splice(index,1);
    localStorage.removeItem(key);
    store('keyArray', keyArray);
    document.getElementById(key).remove();
  }
}

function updateText(e) {
  var key = e.target.closest('li').id;
  var idea = JSON.parse(localStorage.getItem(key));
  var text = e.target.innerText;
  if (e.target.classList.contains('card-body')) {
    idea.body = text;
  } else if (e.target.classList.contains('card-title')) {
    idea.title = text;
  }
  localStorage.setItem(key,JSON.stringify(idea));
}

function filterCards() {
  ideaList.innerHTML = '';
  var searchItems = searchInput.value;
  if (searchItems) {
    keyArray = JSON.parse(localStorage.getItem('keyArray'));
    keyArray.forEach(function(key){
      var rawIdea = localStorage.getItem(key);
      if (rawIdea.includes(searchItems)) {
        renderCard(JSON.parse(rawIdea))
      }
    });
  } else {
    getStorage();
  }
}

function store(key, item) {
  localStorage.setItem(key,JSON.stringify(item));
}

function getStorage(){
  if (localStorage.keyArray) {
    keyArray = JSON.parse(localStorage.getItem('keyArray'));
    keyArray.forEach(function(key){
      var card = JSON.parse(localStorage.getItem(key));
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

function updateQuality(idea, n, id) {
  var cardQuality = document.getElementById(id).querySelector(".card-quality");
  if (idea.quality === "swill" && n === 1) {
    idea.quality = "plausible";
    idea.numQuality = 1;
    cardQuality.innerHTML = "quality: plausible";
  } else if (idea.quality === "plausible" && n === 1) {
    idea.quality = "genius";
    idea.numQuality = 2
    cardQuality.innerHTML = "quality: genius";
  } else if (idea.quality === "genius" && n === -1) {
    idea.quality = "plausible";
    idea.numQuality = 1;
    cardQuality.innerHTML = "quality: plausible";
  } else if (idea.quality === "plausible" && n === -1) {
    idea.quality = "swill";
    idea.numQuality = 0;
    cardQuality.innerHTML = "quality: swill";
  }
  return idea;
}

function sortCards(e) {
  e.preventDefault();
  keyArray.sort(function (a,b){
    var obj1 = JSON.parse(localStorage.getItem(a));
    var obj2 = JSON.parse(localStorage.getItem(b));
    if (obj1.numQuality > obj2.numQuality) {
      return 1;
    } else {
      return -1;
    }
  })
  sortButton.classList.toggle('reverse');
  if (sortButton.classList.contains('reverse')) {
    keyArray.reverse();
  }
  store('keyArray',keyArray);
  ideaList.innerHTML = '';
  getStorage();
}

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

function renderCard(idea) {
  var card = document.createElement('li');
  card.id = idea.id;
  card.className = 'idea-card';
  card.innerHTML = 
    '<h2 class="card-title" contenteditable="true">' + 
      idea.title + 
    '</h2>' +
    '<button class="remove">' + 
    '</button>' +
    '<p class="card-body" contenteditable="true">' + 
      idea.body + 
    '</p>' +
    '<div class="vote-container">' +
      '<button class="upvote">' +
      '</button>' +
      '<button class="downvote">' +
      '</button>' +
      '<h5 class="card-quality">quality: ' + 
      idea.quality + 
      '</h5>' +
    '</div>' +
    '<hr>' +
    '</li>';

  ideaList.insertBefore(card,ideaList.firstChild);
  document.querySelector('form').reset();
}



