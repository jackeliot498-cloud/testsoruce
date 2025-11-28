// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
 console.log('Blog loaded successfully');
 loadBlogPosts();
 setupEventListeners();
});

function loadBlogPosts() {
 const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
 displayPosts(posts);
}

function displayPosts(posts) {
 const postsContainer = document.getElementById('posts-container');
 if (!postsContainer) return;
 postsContainer.innerHTML = '';
 if (posts.length === 0) {
 postsContainer.innerHTML = '<p>No posts yet. Create your first post!</p>';
 return;
 }
 posts.forEach(post => {
 const postElement = createPostElement(post);
 postsContainer.appendChild(postElement);
 });
}

function createPostElement(post) {
 const article = document.createElement('article');
 article.className = 'article';
 article.innerHTML = ` <h2>${post.title}</h2><p class="date">${new Date(post.date).toLocaleDateString()}</p><p>${post.content}</p><p class="tags">${post.tags ? post.tags.join(', ') : ''}</p>`;
 return article;
}

function setupEventListeners() {
 const createPostBtn = document.getElementById('create-post-btn');
 if (createPostBtn) {
 createPostBtn.addEventListener('click', showCreatePostForm);
 }
}

function showCreatePostForm() {
 const form = document.getElementById('post-form');
 if (form) {
 form.style.display = form.style.display === 'none' ? 'block' : 'none';
 }
}

function createPost(title, content, tags) {
 const post = {
 id: Date.now(),
 title: title,
 content: content,
 date: new Date().toISOString(),
 tags: tags ? tags.split(',').map(tag => tag.trim()) : []
 };
 let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
 posts.unshift(post);
 localStorage.setItem('blogPosts', JSON.stringify(posts));
 loadBlogPosts();
 alert('Post created successfully!');
}

function deletePost(postId) {
 if (!confirm('Are you sure you want to delete this post?')) return;
 let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
 posts = posts.filter(post => post.id !== postId);
 localStorage.setItem('blogPosts', JSON.stringify(posts));
 loadBlogPosts();
}