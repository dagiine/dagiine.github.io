async function fetchRSS() {
    try {
      const response = await fetch('https://ikon.mn/rss');
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
  
  fetchRSS();  