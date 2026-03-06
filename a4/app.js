// AI 响应数据库
const aiResponses = {
    // 晚餐推荐
    dinner: {
        keywords: ['晚餐', '晚饭', '吃什么', '菜谱', '食谱', '鸡蛋', '番茄', '土豆'],
        response: (input) => {
            if (input.includes('鸡蛋') && input.includes('番茄')) {
                return `
**🍅 番茄炒蛋 + 🥔 炸土豆片**

**食材清单：**
• 鸡蛋 3-4 个
• 番茄 2-3 个
• 土豆 2 个
• 葱花、盐、糖、生抽适量

**制作步骤：**

1️⃣ **番茄炒蛋**
   - 番茄切块用开水烫去皮，鸡蛋打散加少许盐
   - 热锅下油，先炒鸡蛋至半熟盛起
   - 再炒番茄出汁，加少许糖提鲜
   - 倒入鸡蛋翻炒，撒葱花即可

2️⃣ **香脆土豆片**
   - 土豆切薄片用清水冲洗去淀粉
   - 沥干后入油锅中小火炸至金黄
   - 撒盐和胡椒粉调味

**小贴士：** 番茄去皮后口感更佳，土豆片切薄一些更脆哦！

预计用时：20 分钟
                `;
            }
            return `
根据你的食材，我推荐几个搭配：

**🥗 营养套餐一：番茄土豆炖蛋**
- 食材简单，一锅搞定
- 酸甜开胃，老少皆宜

**🍳 营养套餐二：三色小炒**
- 鸡蛋炒碎、番茄切块、土豆切丝
- 色彩丰富，营养均衡

**🔥 营养套餐三：土豆蛋饼配番茄沙拉**
- 土豆擦丝加鸡蛋煎成饼
- 番茄切块做清爽沙拉

需要我详细说明哪一道的做法吗？
            `;
        }
    },

    // 清洁技巧
    cleaning: {
        keywords: ['清洁', '清洗', '油污', '污渍', '干净', '打扫'],
        response: () => `
**🧹 厨房油污清洁指南**

**强力去油配方：**
• 小苏打 2勺 + 白醋 1勺 + 热水 500ml
• 混合后喷在油污处，静置10分钟
• 用百洁布擦拭，再用干净抹布擦干

**日常清洁小妙招：**

🪟 **油烟机**
- 用废报纸先吸油，再清洗更省力

🍳 **锅底焦渍**
- 放入 Coke 加热煮开，焦渍轻松脱落

🧴 **微波炉**
- 放一碗柠檬水加热2分钟，一擦即净

⚠️ **注意：**
- 清洁时请戴手套，保持通风
- 不同材质表面请先小面积测试
            `
    },

    // 购物清单
    shopping: {
        keywords: ['购物', '清单', '买什么', '采购'],
        response: () => `
**🛒 本周购物清单**

**🥬 蔬菜类**
□ 绿叶菜（菠菜/生菜/小白菜）
□ 根茎类（土豆/胡萝卜/洋葱）
□ 番茄、黄瓜、青椒

**🥩 蛋白质类**
□ 鸡蛋 一板
□ 猪瘦肉/鸡胸肉 500g
□ 豆腐/豆制品

**🍚 主食调料**
□ 大米/面粉
□ 食用油、酱油、醋
□ 葱姜蒜

**🧊 冷藏干货**
□ 牛奶/酸奶
□ 面包/馒头
□ 速冻饺子（应急）

💡 **提示：** 记得检查家里库存，避免重复购买哦！

需要我把这份清单复制给你吗？
            `
    },

    // 收纳技巧
    storage: {
        keywords: ['收纳', '整理', '空间', '衣服', '摆放'],
        response: () => `
**👕 衣服收纳技巧大全**

**📦 分类收纳法：**

1️⃣ **按季节分区**
   - 当季衣物挂放在易取处
   - 换季衣物用收纳箱真空压缩

2️⃣ **按品类分层**
   - 上层：轻薄的薄款、配饰
   - 中层：常穿的外套、衬衫
   - 下层：厚重毛衣、裤子

**✨ 巧用工具：**

🎗️ **滑轨收纳挂袋**
  - 充分利用垂直空间
  - 抽拉式设计拿取方便

📁 **真空压缩袋**
  - 减少衣物体积 70%
  - 防潮防尘防虫蛀

🧺 **分隔式收纳盒**
  - 内衣袜子分类存放
  - 一目了然不混乱

**💡 黄金法则：**
- 每次只拿一件，避免弄乱
- 穿过的衣服暂放区
- 定期断舍离，保持精简

需要我详细介绍哪方面的技巧吗？
            `
    },

    // 技巧妙招
    tips: {
        keywords: ['技巧', '妙招', '方法', '怎么', '如何'],
        response: (input) => {
            if (input.includes('油渍')) {
                return `
**💧 去除衣物油渍三步法**

1️⃣ **立即处理**
   - 用纸巾吸走多余油分
   - 切勿直接水洗（会扩散）

2️⃣ **局部去油**
   - 撒上厚厚一层 BABY 爽身粉或淀粉
   - 静置 15-20 分钟吸油
   - 刷掉粉末，如需要可重复

3️⃣ **彻底清洗**
   - 涂抹洗洁精静置 5 分钟
   - 用温水正常洗涤
   - 油渍严重的可加白醋助溶

🔸 **预防小贴士：** 吃饭时可用餐巾垫在胸前哦！
                `;
            }
            return `
**💡 我可以帮你解决的问题：**

🍳 **烹饪相关**
- 食谱推荐
- 烹饪技巧
- 食材搭配

🧹 **清洁整理**
- 各类污渍去除
- 居家清洁方法
- 收纳整理建议

🛒 **生活管理**
- 购物清单
- 日程提醒
- 省钱小技巧

请告诉我你具体需要什么帮助，我会给你详细的指引！
            `;
        }
    },

    // 默认回复
    default: {
        response: () => `
**😊 感谢你的提问！**

我是你的 AI 居家生活助手，专门帮你解决日常生活问题。

**我可以帮你：**

🍳 推荐菜谱和烹饪建议
🧹 提供清洁和收纳技巧
🛒 整理购物清单
⏰ 设置生活提醒
💡 分享实用生活小妙招

**试试问我：**
- "今天晚饭做什么？"
- "如何快速去除油渍？"
- "帮我整理购物清单"

请问有什么可以帮到你的吗？
        `
    }
};

// DOM 元素
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const quickQuestions = document.getElementById('quickQuestions');

// 自动调整文本框高度
messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

// 监听回车发送
messageInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 发送按钮点击
sendButton.addEventListener('click', sendMessage);

// 快捷问题按钮
quickQuestions.addEventListener('click', function(e) {
    if (e.target.classList.contains('quick-btn')) {
        const question = e.target.dataset.question;
        messageInput.value = question;
        messageInput.style.height = 'auto';
        sendMessage();
    }
});

// 发送消息
function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // 添加用户消息
    addMessage(message, 'user');

    // 清空输入框
    messageInput.value = '';
    messageInput.style.height = 'auto';

    // 显示打字动画
    showTyping();

    // 模拟 AI 回复延迟
    setTimeout(() => {
        removeTyping();
        const response = generateResponse(message);
        addMessage(response, 'assistant');
    }, 1000 + Math.random() * 500);
}

// 添加消息到聊天窗口
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = `message-avatar ${sender}-avatar`;

    if (sender === 'assistant') {
        avatarDiv.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/>
                <path d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z"/>
                <circle cx="12" cy="17" r="1.5"/>
            </svg>
        `;
    } else {
        avatarDiv.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
        `;
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const senderDiv = document.createElement('div');
    senderDiv.className = 'message-sender';
    senderDiv.textContent = sender === 'assistant' ? '居家助手' : '你';

    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.innerHTML = formatMessage(text);

    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = getCurrentTime();

    contentDiv.appendChild(senderDiv);
    contentDiv.appendChild(textDiv);
    contentDiv.appendChild(timeDiv);

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);

    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// 格式化消息（支持 markdown 风格）
function formatMessage(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
}

// 获取当前时间
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// 滚动到底部
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 显示打字动画
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant typing-message';
    typingDiv.innerHTML = `
        <div class="message-avatar assistant-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/>
                <path d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z"/>
                <circle cx="12" cy="17" r="1.5"/>
            </svg>
        </div>
        <div class="message-content">
            <div class="message-sender">居家助手</div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

// 移除打字动画
function removeTyping() {
    const typingMessage = chatMessages.querySelector('.typing-message');
    if (typingMessage) {
        typingMessage.remove();
    }
}

// 生成 AI 回复
function generateResponse(input) {
    const lowerInput = input.toLowerCase();

    // 匹配关键词并返回相应的回复
    for (const [key, data] of Object.entries(aiResponses)) {
        if (key === 'default') continue;

        if (data.keywords && data.keywords.some(keyword => lowerInput.includes(keyword))) {
            return typeof data.response === 'function' ? data.response(input) : data.response;
        }
    }

    // 返回默认回复
    return typeof aiResponses.default.response === 'function'
        ? aiResponses.default.response(input)
        : aiResponses.default.response;
}

// 页面加载完成后聚焦输入框
window.addEventListener('load', () => {
    messageInput.focus();
});
