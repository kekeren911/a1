# 磁流体物理模拟 | Ferrofluid Simulation

一个基于 WebGL 的创意磁流体物理模拟项目，实现类似真实磁流体在磁场作用下呈现的有机尖刺形态。

## 项目特点

- 🎨 **视觉效果优先** - 专注于创造美观的视觉体验，金属质感表面
- 🖱️ **鼠标交互** - 鼠标位置和动作控制磁场
- ⚡ **实时渲染** - 60fps 流畅动画，支持 2500+ 粒子
- 🌐 **纯 Web 实现** - 单个 HTML 文件，无需依赖

## 如何使用

### 基本操作

1. **移动鼠标** - 控制磁场位置，磁流体跟随移动
2. **移动速度** - 快速移动会产生更强的磁场
3. **点击** - 暂时增强磁场强度（2.5倍）
4. **滚轮** - 调节尖刺强度

### 开始使用

直接在浏览器中打开 `index.html` 文件即可：

```bash
# 使用 Python 快速启动本地服务器
python -m http.server 8000

# 或者使用 Node.js
npx serve
```

然后在浏览器访问：`http://localhost:8000`

## 技术架构

### 核心技术

- **渲染引擎**：WebGL + 自定义 GLSL 着色器
- **物理模拟**：粒子系统 + 磁场模型 + Simplex 噪声
- **交互系统**：鼠标/触摸事件处理

### 实现算法

#### 1. 磁流体模拟

使用粒子系统表示磁流体，每个粒子受到：
- **磁吸引力**：向鼠标位置的吸引力
- **尖刺形成力**：通过噪声函数调制的垂直力
- **恢复力**：向原始位置的弱弹簧力
- **阻尼**：速度衰减

#### 2. Metaball 渲染

使用 Fragment Shader 实现 metaball 效果：

```glsl
float field(vec2 p) {
    float sum = 0.0;
    for(int i = 0; i < particleCount; i++) {
        vec2 diff = p - particles[i];
        float dist = length(diff);
        sum += 1.0 / (dist * 5.0 + 0.01);
    }
    return sum;
}
```

#### 3. 视觉效果

- **颜色**：深金属蓝黑色基底 (#1a1a2e) + 青色高光 (#00d4ff)
- **菲涅尔效果**：边缘光突出尖刺轮廓
- **动态光影**：随鼠标位置变化的光照效果
- **噪声纹理**：Simplex 噪声添加表面细节

## 配置参数

可以在 `CONFIG` 对象中调整以下参数：

```javascript
const CONFIG = {
    particleCount: 2500,        // 粒子数量
    magneticStrength: 1500,     // 磁力强度
    magneticRadius: 400,       // 磁场影响半径
    damping: 0.98,             // 阻尼系数
    spikeIntensity: 30,        // 尖刺强度
    baseColor: [...],          // 基础颜色
    highlightColor: [...],     // 高光颜色
};
```

## 性能

### 目标性能

- **桌面端**：3000 粒子 @ 60fps
- **移动端**：1500 粒子 @ 60fps

### 优化策略

- 使用 `Float32Array` 存储粒子数据
- GPU 加速的 metaball 渲染
- 自适应质量调整（移动端自动降低粒子数）

## 兼容性

- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 支持 WebGL 1.0
- 支持触摸设备

## 项目结构

```
b8/
├── index.html    # 主文件（包含所有代码）
└── README.md     # 项目说明
```

**单文件架构**：所有 CSS、JavaScript 和 GLSL 着色器都内嵌在 HTML 文件中，便于部署和分享。

## 代码组织

项目采用模块化类结构：

- `ParticleSystem` - 粒子系统管理
- `PhysicsEngine` - 物理计算（磁场力、噪声）
- `WebGLRenderer` - WebGL 渲染和着色器
- `InputHandler` - 鼠标/触摸事件处理
- `Ferrofluid` - 主类，协调所有组件

## 未来扩展

### 计划功能

- [ ] 参数调节面板（dat.GUI）
- [ ] 多种颜色预设
- [ ] 音频响应模式
- [ ] 预设场景模式
- [ ] 视频导出功能

### 可选增强

```javascript
// 可以添加以下库来增强功能：
// - simplex-noise.js (更优噪声算法)
// - dat.GUI (参数调节面板)
// - stats.js (性能监控)
```

## 许可证

MIT License - 自由使用和修改

## 贡献

欢迎提交 Issue 和 Pull Request！

## 致谢

灵感来源于自然界中磁流体的神奇特性，以及生成艺术的无限可能。
