// 动态数据存储
let posts = [
    {
        id: 1,
        user: { name: '小明', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoming' },
        content: '今天天气真好！☀️ 大家都出去享受阳光了吗？',
        time: Date.now() - 3600000,
        likes: 24,
        liked: false,
        comments: [
            { id: 1, user: { name: '小红', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaohong' }, content: '是啊，我也去公园散步了 🌸', time: Date.now() - 1800000 },
        ]
    },
    {
        id: 2,
        user: { name: '科技达人', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech' },
        content: '刚刚看完最新的科技发布会，AI 发展太快了！未来已来 🤖',
        time: Date.now() - 7200000,
        likes: 156,
        liked: false,
        comments: []
    }
];

let currentPostId = 3;

// 发布动态
function createPost() {
    const textarea = document.getElementById('postContent');
    const content = textarea.value.trim();

    if (!content) {
        alert('请输入内容');
        return;
    }

    const newPost = {
        id: currentPostId++,
        user: { name: '我', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current' },
        content: content,
        time: Date.now(),
        likes: 0,
        liked: false,
        comments: []
    };

    posts.unshift(newPost);
    textarea.value = '';
    renderPosts();
}

// 渲染动态列表
function renderPosts() {
    const container = document.getElementById('postsContainer');

    if (posts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
                </svg>
                <p>还没有动态，来发布第一条吧！</p>
            </div>
        `;
        return;
    }

    container.innerHTML = posts.map(post => createPostHTML(post)).join('');

    // 添加评论输入框的事件监听
    posts.forEach(post => {
        const input = document.querySelector(`#comment-input-${post.id}`);
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addComment(post.id);
                }
            });
        }
    });
}

// 创建动态HTML
function createPostHTML(post) {
    const timeAgo = formatTime(post.time);
    const heartClass = post.liked ? 'active' : '';
    const heartFill = post.liked ? 'currentColor' : 'none';

    return `
        <div class="post" data-post-id="${post.id}">
            <div class="post-header-user">
                <img src="${post.user.avatar}" alt="${post.user.name}" class="avatar">
                <div class="user-details">
                    <div class="user-name">${post.user.name}</div>
                    <div class="post-time">${timeAgo}</div>
                </div>
            </div>
            <div class="post-content">${escapeHtml(post.content)}</div>
            <div class="post-actions-bar">
                <button class="action-btn ${heartClass}" onclick="toggleLike(${post.id}, this)">
                    <svg viewBox="0 0 20 20" fill="${heartFill}" stroke="currentColor" stroke-width="2">
                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                    </svg>
                    <span>${post.likes}</span>
                </button>
                <button class="action-btn" onclick="toggleComments(${post.id})">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                        <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
                    </svg>
                    <span>${post.comments.length}</span>
                </button>
            </div>
            <div class="comments-section" id="comments-${post.id}" style="display: none;">
                <div class="comment-input-wrapper">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=current" alt="我" class="avatar">
                    <input type="text" id="comment-input-${post.id}" placeholder="写下你的评论..." />
                    <button class="comment-btn" onclick="addComment(${post.id})">发送</button>
                </div>
                <div class="comments-list" id="comments-list-${post.id}">
                    ${post.comments.map(comment => createCommentHTML(comment)).join('')}
                </div>
            </div>
        </div>
    `;
}

// 创建评论HTML
function createCommentHTML(comment) {
    return `
        <div class="comment">
            <img src="${comment.user.avatar}" alt="${comment.user.name}" class="avatar">
            <div class="comment-content-wrapper">
                <div class="comment-header">
                    <span class="comment-author">${comment.user.name}</span>
                    <span class="comment-time">${formatTime(comment.time)}</span>
                </div>
                <div class="comment-text">${escapeHtml(comment.content)}</div>
            </div>
        </div>
    `;
}

// 点赞/取消点赞
function toggleLike(postId, button) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    // 添加动画效果
    button.classList.add('heart-animation');
    setTimeout(() => button.classList.remove('heart-animation'), 300);

    renderPosts();
}

// 切换评论区显示
function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    if (commentsSection) {
        const isVisible = commentsSection.style.display !== 'none';
        commentsSection.style.display = isVisible ? 'none' : 'block';
    }
}

// 添加评论
function addComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const content = input.value.trim();

    if (!content) {
        alert('请输入评论内容');
        return;
    }

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const newComment = {
        id: Date.now(),
        user: { name: '我', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current' },
        content: content,
        time: Date.now()
    };

    post.comments.push(newComment);
    input.value = '';
    renderPosts();

    // 保持评论区展开
    setTimeout(() => {
        const commentsSection = document.getElementById(`comments-${postId}`);
        if (commentsSection) {
            commentsSection.style.display = 'block';
        }
    }, 0);
}

// 格式化时间
function formatTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;

    const date = new Date(timestamp);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// HTML转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();

    // 支持Ctrl+Enter发布
    document.getElementById('postContent').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            createPost();
        }
    });
});
