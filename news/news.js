// --- Configuration ---
// !! IMPORTANT: See Security section below about protecting these keys !!
const SPACE_ID = 'YOUR_SPACE_ID';
const ACCESS_TOKEN = 'YOUR_CONTENT_DELIVERY_API_ACCESS_TOKEN';

// --- Initialize Contentful Client ---
const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

// --- Fetch Content ---
// Example: Get all entries of content type 'newsArticle', ordered by publish date
client.getEntries({
    content_type: 'newsArticle', // Use the ID of your content type
    order: '-fields.publishDate' // Order descending by publish date field
  })
  .then((response) => {
    console.log('Contentful Entries:', response.items);
    displayNews(response.items); // Call function to render the news
  })
  .catch(console.error);

// --- Display Content ---
function displayNews(newsItems) {
  const newsContainer = document.getElementById('news-container'); // Get the HTML element where news should go

  if (!newsContainer) {
    console.error('News container element not found!');
    return;
  }

  newsContainer.innerHTML = ''; // Clear previous content

  newsItems.forEach(item => {
    const article = document.createElement('article');
    const title = document.createElement('h2');
    const date = document.createElement('p');
    const body = document.createElement('div'); // Use div for rich text potential

    title.textContent = item.fields.title; // Access fields by their ID
    date.textContent = `Published: ${new Date(item.fields.publishDate).toLocaleDateString()}`;

    // Note: Handling Rich Text requires more complex parsing (e.g., using @contentful/rich-text-html-renderer)
    // For simple text or Markdown, you might access item.fields.body directly or use a Markdown parser.
    // This example assumes body is simple text for now:
     body.textContent = item.fields.body || "Article body missing..."; // Adjust based on your body field type

    article.appendChild(title);
    article.appendChild(date);
    article.appendChild(body);
    newsContainer.appendChild(article);
  });
}