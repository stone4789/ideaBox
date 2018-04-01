var ideaInput = document.querySelector('#title');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('#save-button');
var searchInput = document.querySelector('#search-box');
var ideaList = document.querySelector('#ideaList');
saveButton.onclick(createNewCard());
// Construct New Idea
function newIdea (title, body, id, quality = 'swill') {
    this.title = title,
    this.body = body,
    this.id = id,
    this.quality = quality;
}
// Clear All Inputs
function clearInputs() {
    ideaInput.value = '';
    bodyInput.value = '';
}
// Ideas Object
var Ideas = {
    allIdeas: [],
    add: function (title, body) {
        this.allIdeas.unshift(new Idea(title, body));
        this.store();
    },

    store: function() {
        localStorage.setItem('allIdeas', JSON.stringify(this.allIdeas));
    },

    retrieve: function() {
        var ideasFromStorage = localStorage.getItem('allIdeas') || '[]';
        var ideasAsObjects = JSON.parse(ideasFromStorage);
        this.allIdeas = ideasAsObjects.map(function(obj) {
            return new Idea(obj.title, obj.body, obj.id, obj.quality);
        });
    },

    render: function() {
      ideaList.innerHTML('');
      this.allIdeas.forEach( function (idea) {
      ideaList.append(
        '<article class="idea-card" data-id=' + idea.id + '>' +
          '<h2 class="idea-title" contenteditable="true">' + idea.title + '</h2>' +
          '<button class="image delete-button"></button>' +
          '<p class="idea-body" contenteditable="true">' +
            idea.value +
          '</p>' +
          '<div class="quality-container">' +
            '<button class="image upvote-button"></button>' +
            '<button class="image downvote-button"></button>' +
            '<aside class="current-quality"><span>quality: </span>' +
              idea.quality +
            '</aside>' +
          '</div>' +
        '</article>'
      );
    });
  },

// JSON storage




// Idea Search
// Upvote
//Downvote

// Editing or deleting title or body
