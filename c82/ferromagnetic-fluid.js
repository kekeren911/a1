// 磁流体物理模拟 - Ferromagnetic Fluid Simulation
// 基于粒子系统的交互式磁流体模拟

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = Math.random() * 2 + 1;
        this.color = this.generateColor();
    }

    generateColor() {
        const colors = [
            { r: 0, g: 212, b: 255 },   // 青色
            { r: 123, g: 44, b: 191 },  // 紫色
            { r: 255, g: 0, b: 128 },   // 粉红
            { r: 0, g: 255, b: 200 },   // 青绿
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update(mouseX, mouseY, isMouseDown, magneticStrength, viscosity) {
        // 计算到鼠标的距离和角度
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 磁场力
        let magneticForce = 0;
        if (isMouseDown && distance < 200) {
            // 鼠标按下时产生强吸引力
            magneticForce = magneticStrength * 0.5 / (distance + 1);
        } else {
            // 正常情况下产生弱吸引力
            magneticForce = magneticStrength * 0.05 / (distance + 1);
        }

        const angle = Math.atan2(dy, dx);

        // 应用磁场力
        const forceX = Math.cos(angle) * magneticForce;
        const forceY = Math.sin(angle) * magneticForce;

        this.vx += forceX;
        this.vy += forceY;

        // 添加一些随机扰动，模拟布朗运动
        this.vx += (Math.random() - 0.5) * 0.1;
        this.vy += (Math.random() - 0.5) * 0.1;

        // 应用速度
        this.x += this.vx;
        this.y += this.vy;

        // 应用粘度（阻尼）
        this.vx *= viscosity;
        this.vy *= viscosity;

        // 回归原位的微弱力量
        const returnForce = 0.001;
        this.vx += (this.originX - this.x) * returnForce;
        this.vy += (this.originY - this.y) * returnForce;
    }

    draw(ctx, mouseX, mouseY) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 根据距离调整粒子大小和亮度
        const proximityFactor = Math.max(0, 1 - distance / 300);
        const adjustedRadius = this.radius * (1 + proximityFactor * 2);

        // 创建渐变效果
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, adjustedRadius * 2
        );

        const alpha = 0.3 + proximityFactor * 0.7;
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, adjustedRadius * 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

class FerrofluidSimulation {
    constructor() {
        this.canvas = document.getElementById('ferrofluidCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseDown = false;

        // 模拟参数
        this.particleCount = 1000;
        this.magneticStrength = 50;
        this.viscosity = 0.98;

        // 初始化画布和粒子
        this.initCanvas();
        this.initParticles();
        this.setupEventListeners();
        this.animate();
    }

    initCanvas() {
        // 设置画布尺寸
        const container = this.canvas.parentElement;
        const maxWidth = Math.min(800, window.innerWidth - 60);
        const maxHeight = Math.min(600, window.innerHeight - 300);

        this.canvas.width = maxWidth;
        this.canvas.height = maxHeight;

        // 移动鼠标到中心
        this.mouseX = this.canvas.width / 2;
        this.mouseY = this.canvas.height / 2;
    }

    initParticles() {
        this.particles = [];
        const spacing = Math.sqrt(
            (this.canvas.width * this.canvas.height) / this.particleCount
        );

        for (let x = spacing; x < this.canvas.width; x += spacing) {
            for (let y = spacing; y < this.canvas.height; y += spacing) {
                // 添加一些随机偏移，使粒子分布更自然
                const offsetX = (Math.random() - 0.5) * spacing * 0.5;
                const offsetY = (Math.random() - 0.5) * spacing * 0.5;
                this.particles.push(new Particle(x + offsetX, y + offsetY));
            }
        }
    }

    setupEventListeners() {
        // 鼠标事件
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mousedown', () => {
            this.isMouseDown = true;
        });

        this.canvas.addEventListener('mouseup', () => {
            this.isMouseDown = false;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isMouseDown = false;
        });

        // 触摸事件
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mouseX = touch.clientX - rect.left;
            this.mouseY = touch.clientY - rect.top;
        });

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mouseX = touch.clientX - rect.left;
            this.mouseY = touch.clientY - rect.top;
            this.isMouseDown = true;
        });

        this.canvas.addEventListener('touchend', () => {
            this.isMouseDown = false;
        });

        // 控制面板事件
        const particleCountSlider = document.getElementById('particleCount');
        const particleCountValue = document.getElementById('particleCountValue');
        particleCountSlider.addEventListener('input', (e) => {
            this.particleCount = parseInt(e.target.value);
            particleCountValue.textContent = this.particleCount;
            this.initParticles();
        });

        const magneticStrengthSlider = document.getElementById('magneticStrength');
        const magneticStrengthValue = document.getElementById('magneticStrengthValue');
        magneticStrengthSlider.addEventListener('input', (e) => {
            this.magneticStrength = parseInt(e.target.value);
            magneticStrengthValue.textContent = this.magneticStrength;
        });

        const viscositySlider = document.getElementById('viscosity');
        const viscosityValue = document.getElementById('viscosityValue');
        viscositySlider.addEventListener('input', (e) => {
            this.viscosity = parseFloat(e.target.value);
            viscosityValue.textContent = this.viscosity;
        });

        // 窗口大小变化
        window.addEventListener('resize', () => {
            this.initCanvas();
            this.initParticles();
        });
    }

    animate() {
        // 清空画布（使用半透明背景创建尾迹效果）
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 更新并绘制所有粒子
        for (const particle of this.particles) {
            particle.update(
                this.mouseX,
                this.mouseY,
                this.isMouseDown,
                this.magneticStrength,
                this.viscosity
            );
            particle.draw(this.ctx, this.mouseX, this.mouseY);
        }

        // 绘制磁场指示器
        this.drawMagneticFieldIndicator();

        requestAnimationFrame(() => this.animate());
    }

    drawMagneticFieldIndicator() {
        const gradient = this.ctx.createRadialGradient(
            this.mouseX, this.mouseY, 0,
            this.mouseX, this.mouseY, 50
        );

        const intensity = this.isMouseDown ? 0.3 : 0.1;
        gradient.addColorStop(0, `rgba(0, 212, 255, ${intensity})`);
        gradient.addColorStop(1, `rgba(0, 212, 255, 0)`);

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.mouseX, this.mouseY, 50, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

// 初始化模拟
document.addEventListener('DOMContentLoaded', () => {
    new FerrofluidSimulation();
});
