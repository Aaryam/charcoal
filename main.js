var searchBox = document.getElementById('searchbox');
var searchButton = document.getElementById('searchbutton');

searchButton.addEventListener('click', function () {
    let searchQuery = searchBox.value;
    localStorage.setItem('query', searchQuery.toLowerCase());
    moveTo('search.htm');
});

function moveTo (link)
{
    window.location.href = link;
}