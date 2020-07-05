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

var xmlHttp = null;
var allLinks = []; //set of all internal and external links
httpGet('//en.wikipedia.org/')

function httpGet(theUrl)
{
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true );
    xmlHttp.send( null );
    xmlHttp.onreadystatechange = ProcessRequest;
}

function ProcessRequest()
{
    if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 )
    {           
            var container = document.createElement("p");
            container.innerHTML = xmlHttp.responseText;
            var anchors = container.getElementsByTagName("a");
            var list = [];
             for (var i = 0; i < anchors.length; i++) 
             {
                var href = anchors[i].href;
                var exists = 0;
                for(var j = 0; j < allLinks.length; j++)    // remove duplicates
                    if(allLinks[j] == href)
                        exists = 1;
                if (exists == 0)
                {
                    console.log(href)
                    href = href.replace(window.location.hostname, "")
                    allLinks.push(href);
                    document.getElementById('printLinks').innerHTML += href + "<br />";
                }
             }
        }
}