async function fetchRSS() {
    try {
      const response = await fetch('rss.xml');
      if (!response.ok) {
        console.error(`Response status: ${response.status}`);
        showErrorMessage();
        return;
      }
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  
      if (xmlDoc.querySelector('parsererror')) {
        console.error('XML уншихад алдаа гарлаа.');
        showErrorMessage();
        return;
      }
  
      displayBlogPosts(xmlDoc);
    } catch (error) {
      console.error("Алдаа гарлаа:", error);
      showErrorMessage();
    }
  }
  
  function showErrorMessage() {
    const blogList = document.getElementById("blog-list");
    if (blogList) {
      blogList.innerHTML = '<p>RSS мэдээлэл ачаалахад алдаа гарлаа.</p>';
    }
  }
  
  function displayBlogPosts(xmlDoc) {
    const blogList = document.getElementById("blog-list");
    if (!blogList) {
      console.error("blog-list элемент олдсонгүй.");
      return;
    }
  
    const items = xmlDoc.getElementsByTagName("item");
    blogList.innerHTML = '';
  
    for (let i = 0; i < items.length && i < 10; i++) {
      const item = items[i];
      const title = item.querySelector("title")?.textContent || "Гарчиггүй";
      const description = item.querySelector("description")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
  
      const article = document.createElement("div");
      article.innerHTML = `
        <h2>${title}</h2>
        <p>${description.substring(0, 200)}...</p>
        <small>${pubDate}</small>
      `;
  
      blogList.appendChild(article);
    }
  }
  
  fetchRSS();  