var searchBox = document.getElementById('searchbox');
var searchButton = document.getElementById('searchbutton');

searchButton.addEventListener('click', function () {
    let searchQuery = searchBox.value;
    localStorage.setItem('query', searchQuery.toLowerCase());
    moveTo('search.htm');
});

function moveTo(link) {
    window.location.href = link;
}

function getAllLinks (url) {
  url = 'https://aaryam.github.io/cors-anywhere/demo.html/' + url
  var links = [];
  $.get(url, function(data){
    $("a[href]", data).each(function(i, el){
      links.push($(el).attr("href"));
    });
  });
  return links;
}

let loadPosts = function () {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let response = JSON.parse(this.responseText);
      renderPosts(response);    }
  }
  xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://maximum.blog/@shalvah/posts");
  xhr.setRequestHeader("Accept", 'application/json');
  xhr.send();
}
