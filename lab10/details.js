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
    
    displayBlogDetails(xmlDoc);
  } catch (error) {
    console.error("RSS татахад алдаа гарлаа:", error);
    const blogDetails = document.getElementById("blog-details");
    if (blogDetails) {
      blogDetails.innerHTML = '<div class="error">RSS мэдээлэл ачаалахад алдаа гарлаа.</div>';
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

function getElementContent(parent, tagName) {
  const element = parent.getElementsByTagName(tagName)[0];
  return element ? element.textContent : '';
}

function displayBlogDetails(xmlDoc) {
  const blogDetails = document.getElementById("blog-details");
  if (!blogDetails) {
    console.error("blog-details element олдсонгүй");
    return;
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get("id"));

    if (isNaN(id)) {
      throw new Error('ID параметр буруу байна');
    }

    const items = xmlDoc.getElementsByTagName("item");
    
    if (!items || id < 0 || id >= items.length) {
      throw new Error('Мэдээ олдсонгүй');
    }

    const item = items[id];
    const title = getElementContent(item, "title");
    const description = getElementContent(item, "description");
    const pubDate = getElementContent(item, "pubDate");

    const formattedDate = pubDate ? formatDate(pubDate) : '';
    const sanitizedTitle = sanitizeHTML(title || 'Гарчиггүй');
    const sanitizedDescription = description || '';

    blogDetails.innerHTML = `
      <article>
        <h2>${sanitizedTitle}</h2>
        ${formattedDate ? `<p class="date">${formattedDate}</p>` : ''}
        <div class="content">${sanitizedDescription}</div>
      </article>
    `;
  } catch (error) {
    console.error("Мэдээ харуулахад алдаа гарлаа:", error);
    blogDetails.innerHTML = `<p>Мэдээ олдсонгүй: ${error.message}</p>`;
  }
}

fetchRSS();