// Blog post loader - dynamically loads markdown posts
class BlogLoader {
    constructor() {
        this.postsContainer = document.getElementById('blog-posts');
        this.posts = [];
    }

    async loadPosts() {
        try {
            // Fetch the posts index
            const response = await fetch('posts/index.json');
            if (!response.ok) {
                console.log('No posts index found yet. Add posts to posts/ directory.');
                return;
            }
            
            const postsIndex = await response.json();
            this.posts = postsIndex.posts.sort((a, b) => 
                new Date(b.date) - new Date(a.date)
            );
            
            this.renderPosts();
        } catch (error) {
            console.log('Posts will appear here once you add them to the posts/ directory');
        }
    }

    renderPosts() {
        if (this.posts.length === 0) {
            return;
        }

        // Clear placeholder
        this.postsContainer.innerHTML = '';

        // Render each post
        this.posts.forEach(post => {
            const card = this.createPostCard(post);
            this.postsContainer.appendChild(card);
        });
    }

    createPostCard(post) {
        const card = document.createElement('div');
        card.className = 'blog-card';
        
        const date = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        card.innerHTML = `
            <div class="blog-meta">
                <span class="blog-date">${date}</span>
                <span class="blog-category">${post.category || 'Article'}</span>
            </div>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <a href="post.html?id=${post.slug}" class="read-more">Read More →</a>
        `;

        return card;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const blogLoader = new BlogLoader();
    blogLoader.loadPosts();
});
