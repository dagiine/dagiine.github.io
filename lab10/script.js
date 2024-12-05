// Fetch and display news items in the news list page
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://ikon.mn/rss', true);
xhr.onload = function() {
  if (xhr.status === 200) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xhr.responseText, 'text/xml');
    var items = xmlDoc.getElementsByTagName('item');
    var newsList = document.getElementById('news-list');

    for (var i = 0; i < items.length; i++) {
      var title = items[i].getElementsByTagName('title')[0].textContent;
      var link = items[i].getElementsByTagName('link')[0].textContent;
      var description = items[i].getElementsByTagName('description')[0].textContent;

      // Create a news item element
      var newsItem = document.createElement('div');
      newsItem.classList.add('news-item');

      var newsTitle = document.createElement('h3');
      var newsLink = document.createElement('a');
      newsLink.setAttribute('href', 'news-detail.html?url=' + encodeURIComponent(link));
      newsLink.setAttribute('target', '_blank');
      newsLink.textContent = title;
      
      var newsDescription = document.createElement('p');
      newsDescription.textContent = description;

      newsTitle.appendChild(newsLink);
      newsItem.appendChild(newsTitle);
      newsItem.appendChild(newsDescription);

      newsList.appendChild(newsItem);
    }
  } else {
    console.error('Failed to fetch news');
  }
};

xhr.send();
