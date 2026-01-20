# DeepSlate Labs Website

Professional cybersecurity risk blog hosted on GitHub Pages.

## Setup Instructions

### 1. GitHub Pages Setup

1. Create a new repository named `deepslatelabs.com` (or your preferred name)
2. Upload all files from this directory to the repository
3. Go to repository Settings → Pages
4. Set Source to "Deploy from a branch"
5. Select "main" branch and "/ (root)" folder
6. Save

Your site will be available at: `https://yourusername.github.io/deepslatelabs.com`

### 2. Custom Domain (deepslatelabs.com)

1. In your GitHub repository settings, under Pages, add custom domain: `deepslatelabs.com`
2. In your domain registrar (where you bought deepslatelabs.com), add these DNS records:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

3. Wait for DNS propagation (can take up to 48 hours)
4. Enable "Enforce HTTPS" in GitHub Pages settings

## Adding Your Logo

Replace `assets/images/logo.png` with your DeepSlate Labs logo.

## Writing Blog Posts

### Creating a New Post

1. Create a new Markdown file in the `posts/` directory:
   - Example: `posts/my-new-post.md`

2. Write your content using Markdown syntax

3. Update `posts/index.json` to include your new post:

```json
{
  "posts": [
    {
      "title": "Your Post Title",
      "slug": "your-post-slug",
      "file": "your-post.md",
      "date": "2025-01-19",
      "category": "Security Analysis",
      "excerpt": "Brief description for the blog listing page"
    }
  ]
}
```

4. Commit and push to GitHub

### Markdown Tips

- Use `#` for headers (# H1, ## H2, ### H3)
- `**bold**` for bold text
- `*italic*` for italic text
- ` ```language ` for code blocks
- `[text](url)` for links
- `![alt](image.png)` for images

## Customization

### Colors

Edit `assets/css/style.css` to change colors. Current brand colors:
- Primary (Orange): `#ff8c42`
- Dark Gray: `#2d3436`
- Light backgrounds: `#f8f9fa`

### Contact Information

Update the contact section in `index.html` with your:
- Email address
- Social media links
- LinkedIn profile

### About Section

Modify the About section in `index.html` to reflect your expertise and focus areas.

## File Structure

```
deepslatelabs-site/
├── index.html              # Main homepage
├── post.html              # Blog post template
├── posts/
│   ├── index.json         # Post metadata
│   └── *.md              # Your blog posts
├── assets/
│   ├── css/
│   │   └── style.css     # All styling
│   ├── js/
│   │   ├── main.js       # Main interactions
│   │   ├── blog-loader.js # Loads blog list
│   │   └── post-loader.js # Renders individual posts
│   └── images/
│       └── logo.png      # Your logo
└── README.md             # This file
```

## Features

✅ Clean, professional design
✅ Responsive (mobile-friendly)
✅ Markdown blog posts
✅ Smooth scrolling navigation
✅ Easy to maintain
✅ No database required
✅ Free hosting on GitHub Pages
✅ Custom domain support

## Support

For issues or questions about the website, check GitHub Pages documentation:
https://docs.github.com/en/pages

For Markdown syntax help:
https://www.markdownguide.org/

---

Built for cybersecurity risk analysis and research blogging.
