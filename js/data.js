/* exported data */

var data = {
  view: 'search-form',
  editing: null,
  nextId: 1,
  tempTitle: '',
  search: [],
  review: []
};

var previousDataJSON = localStorage.getItem('Search-Data');
if (previousDataJSON !== null) {
  var previousData = JSON.parse(previousDataJSON);
  data = previousData;
}

function beforeCall(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('Search-Data', dataJSON);
}

window.addEventListener('beforeunload', beforeCall);
