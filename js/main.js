// imports 
var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');


var urls = [];

if (localStorage.key('urls')) 
{
    urls = JSON.parse(localStorage.getItem('urls'));
}


function addBookmark()
{
    var bookmark = {
        siteName: siteName.value,
        siteURL: siteURL.value
    }

    urls.push(bookmark);
    console.log(urls);
}

