// Post loader - loads and renders individual blog posts

class PostLoader {
    constructor() {
        this.postSlug = this.getPostSlug();
        this.post = null;
    }

    getPostSlug() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    async loadPost() {
        if (!this.postSlug) {
            this.showError('No post specified');
            return;
        }

        try {
            // Load the posts index to get metadata
            const indexResponse = await fetch('posts/index.json');
            const postsIndex = await indexResponse.json();
            
            this.post = postsIndex.posts.find(p => p.slug === this.postSlug);
            
            if (!this.post) {
                this.showError('Post not found');
                return;
            }

            // Load the markdown content
            const contentResponse = await fetch(`posts/${this.post.file}`);
            const markdown = await contentResponse.text();

            // Render the post
            this.renderPost(markdown);

        } catch (error) {
            console.error('Error loading post:', error);
            this.showError('Failed to load post');
        }
    }

    renderPost(markdown) {
        // Set title and metadata
        document.getElementById('post-title').textContent = this.post.title;
        document.title = `${this.post.title} | DeepSlate Labs`;
        
        const date = new Date(this.post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        document.getElementById('post-date').textContent = date;
        document.getElementById('post-category').textContent = this.post.category || 'Article';
        document.getElementById('post-category').className = 'blog-category';

        // Render markdown to HTML
        const htmlContent = marked.parse(markdown);
        document.getElementById('post-body').innerHTML = htmlContent;
    }

    showError(message) {
        document.getElementById('post-title').textContent = 'Error';
        document.getElementById('post-body').innerHTML = `
            <p style="color: var(--text-secondary);">${message}</p>
            <p><a href="index.html#blog">Return to blog</a></p>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const postLoader = new PostLoader();
    postLoader.loadPost();
});
