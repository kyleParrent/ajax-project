
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
var reviewButton = document.querySelector('.review-button');
var reviewForm = document.querySelector('.review-form');
var newSearch = document.querySelector('.new-search');
var navReviews = document.querySelector('.reviews');
var userReview = document.querySelector('.user-review');
var userRating = document.querySelector('.user-rating');
var reviewUL = document.querySelector('.review-ul');
var nothingHead = document.querySelector('.nothing');

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
  form.reset();
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
  if (data.review.length !== 0) {
    for (var y = 0; y < data.review.length; y++) {
      reviewUL.prepend(generateReview(data.review[y]));
    }
    nothingHead.className = 'hidden';
  } else {
    nothingHead.className = 'nothing';
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
  xhr.open('GET', 'https://imdb-api.com/en/API/SearchMovie/k_4dqtsi6v/' + title);
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
  xhr.open('GET', 'https://imdb-api.com/en/API/Title/k_4dqtsi6v/' + id + '/Images,');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {
    infoData = {};
    infoData.title = xhr.response.title;
    infoData.poster = xhr.response.image;
    infoData.genre = xhr.response.genres;
    if (xhr.response.runtimeStr === null) {
      infoData.runtime = 'None Given';
    } else {
      infoData.runtime = xhr.response.runtimeStr;
    }
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

reviewButton.addEventListener('click', function () {
  viewSwitch('user-review-page');
});

function saveReview(event) {
  event.preventDefault();
  var liList = document.querySelectorAll('li');
  if (data.editing !== null) {
    for (var i = 0; i < data.review.length; i++) {
      if (data.editing.id === data.review[i].id) {
        data.review[i].rating = userRating.value;
        data.review[i].review = userReview.value;
        data.editing = null;
        var editedReview = data.review[i];
        break;
      }
    }
    var newReview = generateReview(editedReview);
    for (var y = 0; y < liList.length; y++) {
      var listID = liList[y].getAttribute('data-entry-id');
      var newlistID = parseInt(listID);
      if (newlistID === editedReview.id) {
        liList[y].replaceWith(newReview);
        reviewForm.reset();
        viewSwitch('reviews');
      }
    }
  } else {
    infoData.review = userReview.value;
    infoData.rating = userRating.value;
    infoData.id = data.nextId;
    data.nextId++;
    data.review.push(infoData);
    reviewUL.prepend(generateReview(infoData));
    nothingHead.className = 'hidden';
    reviewForm.reset();
    viewSwitch('reviews');
  }
}

reviewForm.addEventListener('submit', saveReview);

function generateReview(dataObj) {
  var revLi = document.createElement('li');
  revLi.setAttribute('data-entry-id', dataObj.id);
  revLi.className = 'reviewed-item';
  var revBox = document.createElement('div');
  revBox.className = 'review-list-box';
  revLi.appendChild(revBox);
  var row = document.createElement('div');
  row.className = 'row';
  revBox.appendChild(row);
  var colFull2 = document.createElement('div');
  colFull2.className = 'col-full';
  row.appendChild(colFull2);
  var iconBox = document.createElement('div');
  iconBox.className = 'icon-box';
  colFull2.appendChild(iconBox);
  var icon = document.createElement('i');
  icon.className = 'fas fa-edit icon';
  iconBox.appendChild(icon);
  var col = document.createElement('div');
  col.className = 'col-half';
  row.appendChild(col);
  var imageBox = document.createElement('div');
  imageBox.className = 'image-box';
  col.appendChild(imageBox);
  var img = document.createElement('img');
  img.className = 'images-pic';
  img.setAttribute('src', dataObj.poster);
  imageBox.appendChild(img);
  var col2 = document.createElement('div');
  col2.className = 'col-half';
  row.appendChild(col2);
  var center = document.createElement('div');
  center.className = 'center';
  col2.appendChild(center);
  var h1 = document.createElement('h1');
  h1.className = 'movie-title';
  h1.textContent = dataObj.title;
  center.appendChild(h1);
  var center2 = document.createElement('div');
  center2.className = 'center';
  col2.appendChild(center2);
  var h12 = document.createElement('h1');
  if (parseInt(dataObj.rating) > 5) {
    h12.className = 'the-rating good-movie';
  } else {
    h12.className = 'the-rating bad-movie';
  }
  h12.textContent = dataObj.rating;
  center2.appendChild(h12);
  var secBox = document.createElement('div');
  secBox.className = 'section-box';
  col2.appendChild(secBox);
  var secHead = document.createElement('p');
  secHead.className = 'section-head';
  secHead.textContent = 'Genre: ';
  secBox.appendChild(secHead);
  var userGenre = document.createElement('p');
  userGenre.className = 'genre section';
  userGenre.textContent = dataObj.genre;
  secBox.appendChild(userGenre);
  var secBox2 = document.createElement('div');
  secBox2.className = 'section-box';
  col2.appendChild(secBox2);
  var secHead2 = document.createElement('p');
  secHead2.className = 'section-head';
  secHead2.textContent = 'Runtime: ';
  secBox2.appendChild(secHead2);
  var userRuntime = document.createElement('p');
  userRuntime.className = 'runtime section';
  userRuntime.textContent = dataObj.runtime;
  secBox2.appendChild(userRuntime);
  var secBox3 = document.createElement('div');
  secBox3.className = 'section-box';
  col2.appendChild(secBox3);
  var secHead3 = document.createElement('p');
  secHead3.className = 'section-head';
  secHead3.textContent = 'Lead Actors: ';
  secBox3.appendChild(secHead3);
  var userActor = document.createElement('p');
  userActor.className = 'actors section';
  userActor.textContent = dataObj.actors;
  secBox3.appendChild(userActor);
  var colFull = document.createElement('div');
  colFull.className = 'col-full';
  row.appendChild(colFull);
  var userRev = document.createElement('p');
  userRev.className = 'the-review';
  userRev.textContent = dataObj.review;
  colFull.appendChild(userRev);
  return revLi;
}

newSearch.addEventListener('click', function () {
  viewSwitch('search-form');
});

navReviews.addEventListener('click', function () {
  viewSwitch('reviews');
});

reviewUL.addEventListener('click', function (event) {
  if (event.target.matches('.icon')) {
    viewSwitch('user-review-page');
    var parentLi = event.target.closest('li');
    var parentIdJSON = parentLi.getAttribute('data-entry-id');
    var parentId = parseInt(parentIdJSON);
    for (var i = 0; i < data.review.length; i++) {
      if (data.review[i].id === parentId) {
        data.editing = data.review[i];
        userReview.value = data.editing.review;
        userRating.value = data.editing.rating;
      }
    }
  }
});
