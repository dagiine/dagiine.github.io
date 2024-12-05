// Fetch and display detailed news content on the detail page
var params = new URLSearchParams(window.location.search);
var newsUrl = params.get('url'); // Get the URL parameter for the news link

var xhr = new XMLHttpRequest();
xhr.open('GET', newsUrl, true);
xhr.onload = function() {
  if (xhr.status === 200) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xhr.responseText, 'text/html');
    var content = xmlDoc.body.innerHTML; // Get the full content of the news

    var newsDetail = document.getElementById('news-detail');
    newsDetail.innerHTML = content;
  } else {
    console.error('Failed to fetch detailed news');
  }
};

xhr.send();
