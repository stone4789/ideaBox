var ideaInput = document.querySelector('#title');
var bodyInput = document.querySelector('#body');
var saveButton = document.querySelector('#save-button');
var searchInput = document.querySelector('#search-box');

saveButton.onclick(createNewCard());

function newIdea (title, body, id, quality = 'swill') {
    this.title = title,
    this.body = body,
    this.id = id,
    this.quality = quality;
}

function clearInputs() {
    ideaInput.value = '';
    bodyInput.value = '';
}