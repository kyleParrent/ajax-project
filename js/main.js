
var userTitle = document.querySelector('.user-title');
var form = document.querySelector('form');
var resultUL = document.querySelector('.result-box');
var views = document.querySelectorAll('.view');

function saveInfo(event) {
  event.preventDefault();
  data.tempTitle = userTitle.value;
}

form.addEventListener('submit', saveInfo);

function createSearch(result) {
  var list = document.createElement('li');
  var row = document.createElement('div');
  row.className = 'row';
  list.appendChild(row);
  var col = document.createElement('div');
  col.className = 'col-full';
  row.appendChild(col);
  var theSearch = document.createElement('div');
  theSearch.className = 'a-search';
  col.appendChild(theSearch);
  var poster = document.createElement('img');
  poster.className = 'search-image';
  poster.setAttribute('src', result.poster);
  theSearch.appendChild(poster);
  var centerDiv = document.createElement('div');
  centerDiv.className = 'center';
  theSearch.appendChild(centerDiv);
  var name = document.createElement('p');
  name.className = 'search-title';
  name.textContent = result.title;
  centerDiv.appendChild(name);
  return list;
}

function domLoad(event) {
  for (var i = 0; i < data.search.length; i++) {
    resultUL.append(createSearch(data.search[i]));
  }
  viewSwitch(data.view);
}

window.addEventListener('DOMContentLoaded', domLoad);

function viewSwitch(view) {
  for (var i = 0; i < views.length; i++) {
    if (views[i].getAttribute('data-view') === view) {
      views[i].className = 'view';
    } else {
      views[i].className = 'view hidden';
    }
  }
  data.view = view;
}
