var searchBox = document.getElementById('searchbox');
var searchButton = document.getElementById('searchbutton');
var igniteButton = document.getElementById('ignitebutton');

searchButton.addEventListener('click', function () {
    let searchQuery = searchBox.value;
    localStorage.setItem('query', searchQuery.toLowerCase());
    moveTo('search.htm', 'priority');
});

igniteButton.addEventListener('click', function () {
  let searchQuery = searchBox.value;
  localStorage.setItem('query', searchQuery.toLowerCase());
  moveTo('search.htm', 'ignite');
});

function moveTo(link, button) {
    window.location.href = link;
    if (button == 'priority')
    {
      localStorage.setItem('searchMethod', 'priority')
    }
    else if (button == 'ignite')
    {
      localStorage.setItem('searchMethod', 'ignite')
    }
}
