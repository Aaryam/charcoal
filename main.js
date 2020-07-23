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

$(document).on('keypress',function(e) {
  if(e.which == 13) {
      localStorage.setItem('query', searchBox.value);
      moveTo('search.htm');
  }
});


function moveTo(link) {
    window.location.href = link;
}
