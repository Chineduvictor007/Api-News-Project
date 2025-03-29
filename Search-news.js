
const apiKey = 'abd7a937dd2a47f982fa04fd1eae8cf4'; // Your API key

const bolgcontainer = document.getElementById("bolg-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Fetch random news articles (top headlines)
async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=13&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }
    catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

// Handle search functionality
searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if(query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlog(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});

// Fetch news articles based on the search query
async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=13&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news", error);
        return [];
    }
}

// Display the news articles on the page
function displayBlog(articles){
    bolgcontainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || "https://via.placeholder.com/600x400"; // fallback image if none is available
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDes = article.description && article.description.length > 120
            ? article.description.slice(0, 120) + "...." 
            : article.description || "No description available.";
        description.textContent = truncatedDes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        bolgcontainer.appendChild(blogCard);
    });
}

// Initial fetch when the page loads
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlog(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();