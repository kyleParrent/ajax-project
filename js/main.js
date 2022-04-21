
var userTitle = document.querySelector('.user-title');
var form = document.querySelector('form');
var resultUL = document.querySelector('.result-box');
var views = document.querySelectorAll('.view');
var home = document.querySelector('.home');
var movieTitle = document.querySelector('.movie-title');
var posterPic = document.querySelector('.poster-pic');
var genre = document.querySelector('.genre');
var runtime = document.querySelector('.runtime');
var actors = document.querySelector('.actors');
var searchContain = document.querySelector('.search-contain');
var infoData = {};

home.addEventListener('click', function () {
  viewSwitch('search-form');
});

function saveInfo(event) {
  event.preventDefault();
  while (resultUL.firstElementChild) {
    resultUL.firstElementChild.remove();
  }
  data.tempTitle = userTitle.value;
  searchRequest(data.tempTitle);
  viewSwitch('search-result');
}

form.addEventListener('submit', saveInfo);

function generateSearchResult(result) {
  var list = document.createElement('li');
  list.className = 'search-list-item';
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
    resultUL.append(generateSearchResult(data.search[i]));
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

function searchRequest(title) {
  data.search = [];
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/SearchMovie/k_u0o3hbaw/' + title);
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.results.length; i++) {
      var newobj = {};
      newobj.title = xhr.response.results[i].title;
      newobj.poster = xhr.response.results[i].image;
      newobj.id = xhr.response.results[i].id;
      data.search.push(newobj);
      resultUL.append(generateSearchResult(data.search[i]));
    }
  }
  );
}

function searchInfoRequest(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/Title/k_u0o3hbaw/' + id + '/Images,');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {
    infoData = {};
    infoData.title = xhr.response.title;
    infoData.poster = xhr.response.image;
    infoData.genre = xhr.response.genres;
    infoData.runtime = xhr.response.runtimeStr;
    infoData.actors = xhr.response.stars;
    movieTitle.textContent = infoData.title;
    posterPic.setAttribute('src', infoData.poster);
    genre.textContent = infoData.genre;
    runtime.textContent = infoData.runtime;
    actors.textContent = infoData.actors;
  }
  );
}

function searchInfo(event) {
  var searchItem = document.querySelectorAll('.a-search');
  for (var i = 0; i < searchItem.length; i++) {
    if (event.target === searchItem[i]) {
      searchInfoRequest(data.search[i].id);
      viewSwitch('info');
    }
  }
}

searchContain.addEventListener('click', searchInfo);
