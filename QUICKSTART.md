# DeepSlate Labs - Quick Deployment Guide

## 🚀 Deploy to GitHub Pages (5 minutes)

### Step 1: Upload to GitHub
1. Go to https://github.com and create a new repository
2. Name it: `deepslatelabs.com` (or any name)
3. Upload all files from the `deepslatelabs-site` folder

### Step 2: Enable GitHub Pages
1. Go to your repository Settings
2. Click "Pages" in the left sidebar
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click Save

Your site will be live at: `https://[your-username].github.io/[repo-name]`

### Step 3: Add Your Logo
1. Replace `assets/images/logo.png` with your DeepSlate Labs logo
2. Commit and push the change

### Step 4: Connect Custom Domain
1. In GitHub Pages settings, enter: `deepslatelabs.com`
2. Update DNS records at your domain registrar:

**Add these A records:**
```
Type: A, Name: @, Value: 185.199.108.153
Type: A, Name: @, Value: 185.199.109.153
Type: A, Name: @, Value: 185.199.110.153
Type: A, Name: @, Value: 185.199.111.153
```

**Add CNAME record:**
```
Type: CNAME, Name: www, Value: [your-username].github.io
```

3. Wait 10-48 hours for DNS propagation
4. Enable "Enforce HTTPS" in GitHub Pages

## ✍️ Writing Your First Blog Post

### Quick Method:
1. Create `posts/my-first-post.md`
2. Write your content in Markdown
3. Edit `posts/index.json` and add:
```json
{
  "title": "My First Post",
  "slug": "my-first-post",
  "file": "my-first-post.md",
  "date": "2025-01-19",
  "category": "Risk Analysis",
  "excerpt": "My insights on cybersecurity risk"
}
```
4. Commit and push - it updates automatically!

### Use the Template:
Copy `posts/template.md` as a starting point for each new post.

## 📝 Markdown Cheat Sheet

```markdown
# Heading 1
## Heading 2
### Heading 3

**bold text**
*italic text*

- Bullet point
- Another point

1. Numbered list
2. Second item

[Link text](https://example.com)

```python
# Code block
print("Hello")
```

> Important note or quote
```

## 🎨 Customization Tips

**Change Colors:**
Edit `assets/css/style.css` - look for `:root` variables at the top

**Update Contact Info:**
Edit the contact section in `index.html`

**Modify About Section:**
Edit the about section in `index.html`

## 📁 File Structure

```
deepslatelabs-site/
├── index.html           # Homepage
├── post.html           # Blog post viewer
├── posts/
│   ├── index.json      # Post metadata (UPDATE THIS)
│   ├── *.md           # Your blog posts
│   └── template.md    # Post template
├── assets/
│   ├── css/style.css
│   ├── js/
│   └── images/
│       └── logo.png    # YOUR LOGO HERE
└── README.md
```

## ✅ Checklist

- [ ] Upload files to GitHub
- [ ] Enable GitHub Pages
- [ ] Add your logo (logo.png)
- [ ] Update contact information
- [ ] Update about section
- [ ] Write your first blog post
- [ ] Configure custom domain (optional)

---

Need help? Check the full README.md for detailed instructions.
