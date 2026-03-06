// AI 响应数据库
const responseDatabase = {
    // 烹饪相关
    cooking: {
        keywords: ['晚餐', '午餐', '早餐', '做菜', '食谱', '烹饪', '食物', '菜', '好吃'],
        responses: {
            default: `🍳 **烹饪建议**

根据您的问题，我为您推荐几个选项：

**简单快手菜：**
• 番茄鸡蛋面 - 15分钟搞定
• 蒜蓉青菜 - 营养爽脆
• 蒸蛋羹 - 嫩滑营养

**进阶推荐：**
• 红烧肉 - 经典家常菜
• 糖醋排骨 - 老少皆宜
• 麻婆豆腐 - 下饭神器

需要具体哪道菜的详细食谱吗？我可以为您详细介绍做法哦！`,
            breakfast: `🌅 **早餐推荐**

**营养搭配选项：**
• 燕麦粥 + 水果 + 坚果
• 全麦面包 + 鸡蛋 + 牛奶
• 小米粥 + 咸菜 + 鸡蛋

**快手早餐：**
• 香蕉燕麦杯（前一晚准备）
• 三明治（5分钟搞定）
• 酸奶果杯

您想了解哪种早餐的详细做法？`
        }
    },

    // 清洁相关
    cleaning: {
        keywords: ['清洁', '打扫', '干净', '整理', '收纳', '洗碗', '洗衣', '清洁剂', '污渍'],
        responses: {
            default: `🧹 **清洁小技巧**

让我为您分享一些实用的清洁技巧：

**厨房清洁：**
• 燃气灶：用小苏打+白醋，轻松去除油渍
• 抽油烟机：温水+洗洁精，定期擦拭
• 冰箱：每月清理一次，用温水擦拭

**卫生间清洁：**
• 马桶：洁厕灵定期使用
• 瓷砖：白醋+水喷雾，防霉去污
• 镜子：报纸擦拭，不留水痕

**日常小妙招：**
• 开水间作息：定期通风换气
• 物品归位：用完即收，养成好习惯

需要更详细的清洁指南吗？`,
            quick: `⚡ **快速清洁guide**

**30分钟快速清洁法：**

1. 开窗通风 (1分钟)
2. 收拾杂物 (5分钟)
3. 擦拭桌面 (5分钟)
4. 地面清洁 (10分钟)
5. 整理床铺 (5分钟)
6. 最后检查 (4分钟)

**效率工具推荐：**
• 静电拖把 - 吸发去尘
• 魔术海绵 - 去污神器
• 小苏打 - 天然清洁剂`
        }
    },

    // 整理收纳
    organizing: {
        keywords: ['整理', '收纳', '衣柜', '储物', '空间', '摆放', '分类'],
        responses: {
            default: `📦 **收纳整理建议**

**衣物收纳法：**
• 垂直折叠法 - 节省空间
• 分类存放 - 上衣、裤子、内衣分开
• 换季收纳 - 不当季衣物收纳箱存放

**厨房收纳：**
• 抽屉分隔 - 筷子、勺子分类
• 吊柜利用 - 轻物品上置
• 转角架 - 充分利用死角

**其他技巧：**
• 断舍离原则 - 一年没用就扔掉
• 物以类聚 - 同类物品集中存放
• 标签管理 - 收纳箱贴标签

需要针对具体区域的收纳建议吗？`,
            wardrobe: `👔 **衣柜整理技巧**

**步骤一：清空分类**
1. 全部拿出衣柜
2. 按类别分：上衣、裤子、裙装、外套
3. 按频率分：常穿、偶尔穿、很少穿

**步骤二：断舍离**
• 超过2年没穿 - 考虑捐赠
• 尺码不合适 - 处理掉
• 损坏无法修补 - 扔掉

**步骤三：科学收纳**
• 垂直悬挂 - 外套、衬衫
• 抽叠存放 - T恤、毛衣
• 收纳盒 - 配饰、内衣

定期整理，保持衣柜清爽！`
        }
    },

    // 购物清单
    shopping: {
        keywords: ['购买', '购物', '清单', '商品', '买', '超市', '省钱'],
        responses: {
            default: `🛒 **购物助手**

**家庭常备清单：**

📌 厨房用品
• 米面油、调味品
• 蔬菜、水果、肉类
• 鸡蛋、牛奶、豆制品

📌 日用品
• 洗衣液、洗洁精
• 纸巾、垃圾袋
• 牙膏、洗发水

📌 应急储备
• 方便面、罐头
• 蜡烛、电池
• 常用药品

**省钱小贴士：**
• 关注超市促销
• 批量购买日用品
• 列好清单，按需购买
• 货比三家

需要制定详细的购物清单吗？`,
            medicine: `💊 **家庭常备药品清单**

**基础药品：**
• 退烧药（布洛芬、对乙酰氨基酚）
• 感冒药（感冒灵、板蓝根）
• 肠胃药（蒙脱石散、健胃消食片）
• 创可贴、消毒水

**外用药品：**
• 碘伏、酒精
• 红花油、云南白药
• 抗生素软膏

**温馨提示：**
⚠️ 药品定期检查过期时间
⚠️ 儿童药品单独存放
⚠️ 严重症状及时就医
⚠️ 按说明书或医嘱用药

建议每半年整理一次药品哦！`
        }
    },

    // 健康管理
    health: {
        keywords: ['健康', '运动', '睡眠', '作息', '锻炼', '养生', '身体'],
        responses: {
            default: `💪 **健康生活建议**

**作息建议：**
• 早睡早起 - 23:00前入睡
• 规律作息 - 周末不熬夜
• 午休 - 20-30分钟最佳

**运动推荐：**
• 晨间活动 - 伸展运动、慢跑
• 居家运动 - 瑜伽、跳绳
• 每周目标 - 150分钟中等强度运动

**饮食习惯：**
• 早餐要吃好
• 三餐规律
• 多喝水（每天8杯水）
• 少油少盐

**心理健康：**
• 适当放松
• 培养爱好
• 保持社交

想了解更多健康知识吗？`
        }
    }
};

// 每日小贴士
const dailyTips = [
    "💡 用胶带去除衣服上的宠物业和毛发，效果杠杠的！",
    "💡 香蕉皮可以用来擦拭皮革鞋，让鞋子更亮！",
    "💡 冰箱放一卷卫生纸，可以吸潮去味！",
    "💡 吹风机热风可以快速去除不干胶标签的痕迹！",
    "💡 用可乐清理马桶，倒进去静置一小时再刷！",
    "💡 晾衣服时抖开并用手拍打，干衣服更平整！",
    "💡 牛奶过期了别扔，可以用来擦皮鞋和皮具！",
    "💡 手机充电时，取下手机壳充电更快！",
    "💡 柠檬加盐可以去掉砧板上的异味！",
    "💡 煮面条时在水里加点油，面条不粘锅！"
];

// DOM 元素
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const quickBtns = document.querySelectorAll('.quick-btn');
const topicItems = document.querySelectorAll('.topic-item');
const dailyTipElement = document.getElementById('dailyTip');

// 初始化
function init() {
    setDailyTip();
    setupEventListeners();
    autoResizeTextarea();
}

// 设置每日小贴士
function setDailyTip() {
    const today = new Date().getDate();
    const tipIndex = today % dailyTips.length;
    dailyTipElement.textContent = dailyTips[tipIndex];
}

// 设置事件监听
function setupEventListeners() {
    // 发送按钮
    sendBtn.addEventListener('click', sendMessage);

    // 回车发送
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 快捷按钮
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            userInput.value = query;
            sendMessage();
        });
    });

    // 话题点击
    topicItems.forEach(item => {
        item.addEventListener('click', () => {
            const topic = item.getAttribute('data-topic');
            handleTopicClick(topic);
        });
    });
}

// 自动调整文本框高度
function autoResizeTextarea() {
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
    });
}

// 发送消息
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // 添加用户消息
    addMessage(message, 'user');
    userInput.value = '';
    userInput.style.height = 'auto';

    // 禁用发送按钮
    sendBtn.disabled = true;

    // 显示打字指示器
    showTypingIndicator();

    // 模拟 AI 响应延迟
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateResponse(message);
        addMessage(response, 'assistant');
        sendBtn.disabled = false;
    }, 1000 + Math.random() * 1000);
}

// 添加消息
function addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type === 'user' ? 'user-message' : 'assistant-message'}`;

    const avatar = type === 'user' ? '您' : 'AI';
    const avatarClass = type === 'user' ? 'user-avatar' : 'assistant-avatar';

    // 用户头像图标
    const userIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>`;

    // AI 头像图标
    const aiIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>`;

    messageDiv.innerHTML = `
        <div class="message-avatar ${avatarClass}">
            ${type === 'user' ? userIcon : aiIcon}
        </div>
        <div class="message-content">
            <div class="message-text">${formatMessage(content)}</div>
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 格式化消息
function formatMessage(content) {
    // 转换 markdown 风格的格式
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\n/g, '<br>');
    content = content.replace(/^• /gm, '&bull; ');
    return content;
}

// 获取当前时间
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// 显示打字指示器
function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'message assistant-message';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = `
        <div class="message-avatar assistant-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
        </div>
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 隐藏打字指示器
function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// 生成 AI 响应
function generateResponse(query) {
    const lowerQuery = query.toLowerCase();

    // 检查各个类别的响应
    for (const [category, data] of Object.entries(responseDatabase)) {
        for (const keyword of data.keywords) {
            if (lowerQuery.includes(keyword)) {
                // 根据具体问题返回不同响应
                if (category === 'cooking') {
                    if (lowerQuery.includes('早餐')) return data.responses.breakfast;
                    if (lowerQuery.includes('早')) return data.responses.breakfast;
                }
                if (category === 'cleaning') {
                    if (lowerQuery.includes('快速') || lowerQuery.includes('30')) return data.responses.quick;
                }
                if (category === 'organizing') {
                    if (lowerQuery.includes('衣柜') || lowerQuery.includes('衣服')) return data.responses.wardrobe;
                }
                if (category === 'shopping') {
                    if (lowerQuery.includes('药') || lowerQuery.includes('药品')) return data.responses.medicine;
                }
                return data.responses.default;
            }
        }
    }

    // 默认友好响应
    const defaultResponses = [
        `您好！关于"${query}"这个问题，让我为您想想...\n\n我可以帮您解决的问题包括：\n• 烹饪美食推荐\n• 家居清洁技巧\n• 收纳整理建议\n• 购物清单制定\n• 健康生活指导\n\n请选择一个话题，或者更详细地描述您的需求！`,
        `收到您的问题"${query}"！\n\n作为您的居家助手，我擅长：\n🍳 推荐简单美味的家常菜\n🧹 传授高效的清洁技巧\n📦 提供科学的收纳方案\n\n有什么我能帮您的吗？`
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// 处理话题点击
function handleTopicClick(topic) {
    const topicQueries = {
        cooking: '推荐几个好学的家常菜做法',
        cleaning: '快速清洁家里有什么技巧吗？',
        shopping: '帮我制定一个购物清单',
        health: '如何保持健康的生活习惯？'
    };

    userInput.value = topicQueries[topic];
    sendMessage();
}

// 启动应用
init();
