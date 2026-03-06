# 沉浸式VR展厅

一个基于Three.js的沉浸式VR艺术展厅，支持桌面浏览和VR设备体验。

## 功能特点

- 🎨 **3D虚拟展厅**：精美的3D画廊环境
- 🖼️ **艺术展品**：多件可交互的艺术作品
- 🎮 **多种交互方式**：鼠标控制和VR设备支持
- ✨ **炫酷灯光**：动态光照和阴影效果
- 🚶 **双模式切换**：步行模式和飞行模式
- 📱 **响应式设计**：适配各种设备尺寸
- 🎯 **智能交互**：点击聚焦查看展品详情

## 快速开始

### 前置要求

- 现代Web浏览器（Chrome、Firefox、Safari等）
- 本地Web服务器（用于开发）

### 运行方式

1. **使用Python快速启动服务器**：

```bash
# Python 3
python -m http.server 8000

# 或使用Python 2
python -m SimpleHTTPServer 8000
```

2. **使用Node.js http-server**：

```bash
# 首先安装http-server
npm install -g http-server

# 启动服务器
http-server -p 8000
```

3. **使用PHP内置服务器**：

```bash
php -S localhost:8000
```

4. **在浏览器中打开**：

```
http://localhost:8000/vr-gallery.html
```

## 使用说明

### 桌面模式

- 🖱️ **鼠标拖动**：旋转视角
- 🔍 **滚轮**：缩放场景
- 👆 **点击展品**：聚焦查看详情
- 📍 **悬停**：显示展品信息

### 控制按钮

- **步行模式**：限制视角在地面以上，模拟真实行走
- **飞行模式**：自由移动视角，可以俯瞰整个展厅
- **重置视角**：回到初始位置

### VR模式

- 点击右下角的"进入VR"按钮
- 需要VR头显设备（如Oculus Quest、HTC Vive等）
- 使用VR控制器进行交互

## 技术特点

### 核心技术
- **Three.js r150**：3D渲染引擎
- **WebXR**：VR/AR设备支持
- **现代JavaScript ES6+**：模块化代码结构

### 视觉效果
- PBR材质系统
- 实时阴影渲染
- 环境光遮蔽
- 动态光照系统
- 后期处理效果

### 交互特性
- 光线投射检测
- 平滑相机动画
- 智能聚焦系统
- 工具提示显示

## 项目结构

```
b7/
├── vr-gallery.html    # 主HTML文件
├── vr-gallery.js      # JavaScript逻辑
└── README.md          # 项目说明
```

## 自定义修改

### 添加新展品

在 `vr-gallery.js` 中修改 `artworksData` 数组：

```javascript
{
    position: new THREE.Vector3(x, y, z),
    size: { width: 宽度, height: 高度 },
    color: 颜色值,
    title: "作品标题",
    description: "作品描述"
}
```

### 修改展厅颜色

在 `createGallery()` 方法中修改墙壁和地板的颜色：

```javascript
const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x2d2d44,  // 地板颜色
    roughness: 0.8,
    metalness: 0.2
});
```

### 调整光照

在 `createLighting()` 方法中调整光照强度和颜色：

```javascript
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);  // 环境光
const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);  // 主光源
```

## 浏览器兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 15+
- ✅ Edge 90+

## 性能优化建议

1. **降低渲染质量**：调整 `renderer.setPixelRatio()`
2. **减少阴影复杂度**：减小 `shadow.mapSize`
3. **简化几何体**：降低多边形数量
4. **使用LOD**：根据距离切换不同精度的模型

## 故障排除

### 展品无法加载
- 检查浏览器控制台是否有错误
- 确保通过HTTP服务器访问（不是file://协议）

### VR模式不工作
- 检查浏览器是否支持WebXR
- 确保VR设备已正确连接
- 尝试更新浏览器到最新版本

### 性能问题
- 关闭其他浏览器标签页
- 降低渲染分辨率
- 检查显卡驱动是否最新

## 未来扩展

- [ ] 添加音频导览
- [ ] 支持更多VR设备
- [ ] 添加多人在线功能
- [ ] 实现展品购买功能
- [ ] 支持自定义展厅布局

## 许可证

MIT License - 自由使用和修改

## 致谢

- Three.js 社区
- WebXR 规范
- 所有贡献者

---

祝您享受美好的虚拟艺术之旅！🎨✨
