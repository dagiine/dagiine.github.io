let newsItems = [];

function fetchNews() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "rss.xml", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
            const items = xmlDoc.getElementsByTagName("item");

            if (items.length > 0) {
                const newsList = document.getElementById("news-list");
                newsList.innerHTML = "";

                newsItems = Array.from(items).slice(0, 12).map((item, index) => {
                    const title = item.getElementsByTagName("title")[0]?.textContent || "No Title";
                    const link = item.getElementsByTagName("link")[0]?.textContent || "#";
                    const description = item.getElementsByTagName("description")[0]?.textContent || "No Details";

                    const imageMatch = description.match(/<img[^>]+src="([^">]+)"/);
                    const imageUrl = imageMatch ? imageMatch[1] : 'https://via.placeholder.com/300x200?text=News';

                    const newsItem = document.createElement("div");
                    newsItem.classList.add("news-card");
                    newsItem.dataset.index = index;
                    newsItem.innerHTML = `
                        <img src="${imageUrl}" alt="${title}" class="news-card-image" onerror="this.src='https://via.placeholder.com/300x200?text=News'">
                        <div class="news-card-content">
                            <h2 class="news-card-title">${title}</h2>
                            <p class="news-card-description">${description.replace(/<[^>]*>/g, '')}</p>
                        </div>
                    `;

                    newsItem.addEventListener('click', () => showSingleNews(index));

                    newsList.appendChild(newsItem);

                    return {
                        title,
                        link,
                        description,
                        imageUrl
                    };
                });
            } else {
                document.getElementById("news-list").innerHTML = '<div class="error">No news found!</div>';
            }
        } else {
            console.error("Error fetching RSS.");
            document.getElementById("news-list").innerHTML = '<div class="error">Error loading news.</div>';
        }
    };
    xhr.onerror = function () {
        console.error("Request failed.");
        document.getElementById("news-list").innerHTML = '<div class="error">Network error occurred.</div>';
    };
    xhr.send();
}

function showSingleNews(index) {
    const news = newsItems[index];
    const singleNewsContainer = document.getElementById("single-news");
    const newsListContainer = document.getElementById("news-list");

    singleNewsContainer.innerHTML = `
        <a href="#" class="back-button" onclick="showNewsList(); return false;">◀ Back</a>
        <img src="${news.imageUrl}" alt="${news.title}" class="single-news-image" onerror="this.src='https://via.placeholder.com/1200x600?text=News'">
        <h1 class="single-news-title">${news.title}</h1>
        <div class="single-news-content">
            ${news.description.replace(/<[^>]*>/g, '')}
            <p><br><a href="${news.link}" target="_blank">Go to source</a></p>
        </div>
    `;

    newsListContainer.style.display = 'none';
    singleNewsContainer.style.display = 'block';
}

function showNewsList() {
    const singleNewsContainer = document.getElementById("single-news");
    const newsListContainer = document.getElementById("news-list");

    newsListContainer.style.display = 'grid';
    singleNewsContainer.style.display = 'none';
}

fetchNews();