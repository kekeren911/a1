# 沉浸式VR展厅 🎨

一个使用Three.js构建的沉浸式虚拟现实(VR)艺术展厅体验。

## 功能特性

- 🖼️ **3D展厅环境**：逼真的3D展厅空间，包含墙壁、地板和专业照明
- 🎨 **多件艺术展品**：6幅独特的数字艺术作品，带有详细的信息展示
- 🖱️ **交互控制**：
  - 鼠标拖动旋转视角
  - 点击画作查看详细信息
  - WASD/方向键在展厅中移动
- 🎮 **VR支持**：支持WebXR标准，可使用VR设备沉浸式体验
- ✨ **视觉效果**：聚光灯照明、阴影效果材质渲染

## 安装和运行

### 环境要求

- Node.js (v16或更高版本)
- 现代浏览器(支持WebXR/WebGL)

### 安装步骤

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 使用说明

### 桌面端操作

- **视角控制**：按住鼠标左键拖动旋转视角
- **查看信息**：点击任意画作查看详细信息
- **移动**：
  - W/↑：向前移动
  - S/↓：向后移动
  - A/←：向左移动
  - D/→：向右移动
- **重置视角**：点击"重置视角"按钮

### VR模式

1. 点击"进入VR模式"按钮
2. 将VR设备连接到电脑
3. 在VR浏览器中打开应用
4. 享受沉浸式艺术体验

## 项目结构

```
vr-gallery/
├── index.html      # HTML入口文件
├── styles.css      # 样式文件
├── main.js         # 主要JavaScript代码
├── package.json    # 项目配置
└── README.md       # 说明文档
```

## 技术栈

- **Three.js**：3D图形库
- **WebXR**：VR/AR支持
- **Vite**：快速开发服务器

## 自定义

### 添加新的展品

在 `main.js` 中的 `artworkData` 数组添加新的展品信息：

```javascript
{
    title: "新标题",
    description: "作品描述",
    artist: "艺术家名称",
    position: { x: 0, y: 2, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }
}
```

### 修改展厅样式

- **颜色和材质**：修改 `main.js` 中的材质参数
- **展厅大小**：调整 `createGallery()` 函数中的尺寸参数
- **光照效果**：在 `setupLighting()` 中调整光照参数

## 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+ (有限支持)
- VR设备需要WebXR支持

## 许可证

MIT License
