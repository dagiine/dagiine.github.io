async function fetchRSS() {
  try {
    const response = await fetch('rss.xml');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      throw new Error('XML parsing failed');
    }
    
    displayBlogPosts(xmlDoc);
  } catch (error) {
    console.error("RSS татахад алдаа гарлаа:", error);
    const blogList = document.getElementById("blog-list");
    if (blogList) {
      blogList.innerHTML = '<div class="error">RSS мэдээлэл ачаалахад алдаа гарлаа.</div>';
    }
  }
}

function sanitizeHTML(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

function formatDate(dateStr) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleString('mn-MN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error("Огноо форматлахад алдаа гарлаа:", error);
    return dateStr;
  }
}

function getTextFromHTML(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

function displayBlogPosts(xmlDoc) {
  const blogList = document.getElementById("blog-list");
  if (!blogList) {
    console.error("blog-list element олдсонгүй");
    return;
  }

  const items = xmlDoc.getElementsByTagName("item");
  const maxPosts = Math.min(items.length, 10);
  blogList.innerHTML = '';

  for (let i = 0; i < maxPosts; i++) {
    const item = items[i];
    if (!item) continue;

    const title = item.querySelector("title")?.textContent || "Гарчиггүй";
    const description = item.querySelector("description")?.textContent || "";
    const pubDate = item.querySelector("pubDate")?.textContent;
    
    const summary = getTextFromHTML(description).substring(0, 200) + '...';
    const detailsLink = `details.html?id=${i}`;

    const blogItem = document.createElement("article");
    blogItem.className = "blog-item";

    blogItem.innerHTML = `
      <h2 class="blog-title">
        <a href="${detailsLink}" class="blog-link">
          ${sanitizeHTML(title)}
        </a>
      </h2>
      <div class="blog-date">${pubDate ? formatDate(pubDate) : ''}</div>
      <div class="blog-summary">${sanitizeHTML(summary)}</div>
      <a href="${detailsLink}" class="read-more">Дэлгэрэнгүй</a>
    `;

    blogList.appendChild(blogItem);
  }
}

fetchRSS();