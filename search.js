var webList = []

if (localStorage.getItem("webList") == "" || localStorage.getItem("webList") == null) {
    localStorage.setItem("webList", JSON.stringify(webList));
    webList[0].replace('[', '');
    webList[webList.length - 1].replace(']', '');
}
else {
    var data = []
    data = localStorage.getItem("webList");
    webList = data.split(",")
    for (let index = 0; index < webList.length; index++) {
        const element = webList[index];
        console.log(element + ' ' + index)
    }
}

var searchBox = document.getElementById('searchbox')
var searchButton = document.getElementById('searchbutton');

searchBox.value = localStorage.getItem('query');

searchButton.addEventListener('click', function () {
    localStorage.setItem('query', searchBox.value);
    location.reload();
});
var query = localStorage.getItem('query').toLowerCase();
if (query[query.length - 1] == " ")
{
    query = query.slice(0, -1)
}

function getTitle(url, element, boolean) {
    $.ajax({
        url: "https://textance.herokuapp.com/title/" + url,
        complete: function (data) {
            boolean = true;
            element.innerHTML = data.responseText;
        },
        error: function (err) {
            boolean = false;
            element.innerHTML = url.replace('https://', '');
            throw ' • ERROR: ' + url + ' • Not Scraped ' + err
        }
    });
}

var querriedArray = []

function createRef(refVal) {
    let a = document.createElement('a');
    let p = document.createElement('p');
    a.setAttribute('href', refVal);
    getTitle(refVal, a);
    let br = document.createElement('br');
    let br1 = document.createElement('br');
    p.innerText = refVal;
    p.innerText = p.innerText.replace('https://', '')
    p.innerText = p.innerText.replace('/', ' › ')
    p.innerText = p.innerText.replace('www.', '')
    p.setAttribute('class', 'linkTxt')
    document.body.appendChild(p)
    document.body.appendChild(a);
    document.body.appendChild(br);
    document.body.appendChild(br1);
}

function igniteSearch() {
    // convert everything to their own names or something
    function convertToName() {
        let array = [];
        array = [...webList];
        let returnArray = [];
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            let slashIndex = "";
            if (occurrences(element, '/') > 2) {
                slashIndex = element.substring(element.lastIndexOf('/'))
            }
            let removeExtensionIndex = element.lastIndexOf('.')

            array[index] = element.substring(8, removeExtensionIndex)
            if (slashIndex != "") {
                array[index] = array[index] + slashIndex;
            }
        }
        for (let index = 0; index < array.length; index++) {
            array[index] = array[index].replace('.', ' ')
            array[index] = array[index].replace('/', ' ')
            array[index] = array[index].replace('-', ' ')
            returnArray.push(array[index]);
            if (index == 0)
            {
                console.log(array[index].split(" ").length)
            }
        }
        return returnArray;
    }

    var finalArr = []

    function ignite() {
        array = convertToName();
        for (let index = 0; index < array.length; index++) {
            const element = array[index];

            let score = 100 / array.length;
            var wordBreak = query.split(" ");
            let wordCount = 0;
            for (let indexW = 0; indexW < wordBreak.length; indexW++) {
                const word = wordBreak[indexW];
                if (element.split(" ").includes(word)) {
                    wordCount++;
                }
                else if (element.includes(word)) {
                    wordCount += 0.5;
                }
                if (indexW == wordBreak.length - 1)
                {
                    if (element.split(" ").length == wordBreak.length && wordCount > 100 / array.length)
                    {
                        wordCount += 0.5;
                    }
                }
            }
            score = score + wordCount / element.split(" ").length
            console.log(score + ' ' + array[index])
            // score = score + amount of words which is equal / amount of words in the website
            let websiteClass = new Website(webList[index], score);
            finalArr.push(websiteClass);
        }
        finalArr = finalArr.sort(function (a, b) {
            return b.score - a.score;
        });
        console.log(finalArr)
        console.log(webList)
    }

    class Website {
        constructor(link, score) {
            this.link = link;
            this.score = score;
        }
    }

    ignite();
    for (let index = 0; index < finalArr.length; index++) {
        const element = finalArr[index];
        if (element.score > finalArr[finalArr.length - 1].score)
        {
            createRef(element.link)
        }
    }
}

function removeDuplicates (arr)
{
    return [... new Set(arr)]
}

if (localStorage.getItem('searchMethod') == 'priority') {
    window.setTimeout(createLinks, 1);
}
else {
    window.setTimeout(igniteSearch, 1);
}

function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}