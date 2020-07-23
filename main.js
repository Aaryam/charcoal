var searchBox = document.getElementById('searchbox');
var igniteButton = document.getElementById('ignitebutton');
var settingsButton = document.getElementById('settingsButton')

igniteButton.addEventListener('click', function () {
  let searchQuery = searchBox.value;
  localStorage.setItem('query', searchQuery.toLowerCase());
  moveTo('search.htm');
});


settingsButton.addEventListener('click', function() {
  moveTo('settings.htm')
});


function moveTo(link) {
    window.location.href = link;
}
