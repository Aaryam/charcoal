var webList = 
[
    "https://yahoo.co.jp",
    "https://ovh.com",
    "https://soratemplates.com",
    "https://php.net",
    "https://abc.net",
    "https://chicagotribune.com",
    "https://vox.com",
    "https://espn.com",
    "https://my.yahoo.com",
    "https://secureserver.net",
    "https://xinhu.net",
    "https://ign.com",
    "https://whitehouse.gov",
    "https://nokia.com",
    "https://goodreads.com",
    "https://worldbank.org",
    "https://storage.googleapis.com",
    "https://flix.com",
    "https://walmart.com",
    "https://elmundo.es",
    "https://ietf.org",
    "https://asus.com",
    "https://inst.ructables.com",
    "https://venturebeat.com",
    "https://theatlantic.com",
    "https://bund.de",
    "https://finance.yahoo.com",
    "https://bp.blogger.com",
    "https://amazon.es",
    "https://target.com",
    "https://latimes.com",
    "https://themeforest.net",
]

var anotherArray = [...webList]

function test() {
    for (let index = 0; index < anotherArray.length; index++) {
        const element = anotherArray[index];
        if (element[-1] != '/') {
            anotherArray[index] = anotherArray[index] + '/'
        }
    }

    for (let index = 0; index < anotherArray.length; index++) {
        const element = anotherArray[index];
        anotherArray[index] = anotherArray[index].replace('https://', '')
        if (element.includes('www.')) {
            anotherArray[index] = anotherArray[index].replace('www.', '')
        }
    }

    for (let index = 0; index < anotherArray.length; index++) {
        const element = anotherArray[index];
        let last = element.substring(element.indexOf("/", 0))
        if (last != '/') {
            anotherArray[index] = element.substring(element.lastIndexOf('.'), -1) + last
        }
        else {
            anotherArray[index] = element.substring(element.lastIndexOf('.'), -1)
        }
    }

    for (let index = 0; index < anotherArray.length; index++) {
        const element = anotherArray[index];
        if (element.includes('_')) {
            anotherArray[index] = anotherArray[index].replace('_', ' ')
        }
        anotherArray[index] = anotherArray[index].replace('/', ' ')
        anotherArray[index] = anotherArray[index].replace('.', ' ')
        console.log(anotherArray[index])
    }
}
test();
