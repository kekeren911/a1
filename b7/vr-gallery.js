import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

class VRGallery {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.artworks = [];
        this.selectedObject = null;
        this.isWalkMode = true;
        this.clock = new THREE.Clock();

        this.init();
        this.createScene();
        this.createLighting();
        this.createGallery();
        this.createArtworks();
        this.setupControls();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        // 场景
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);
        this.scene.fog = new THREE.Fog(0x1a1a2e, 10, 50);

        // 相机
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 2, 8);

        // 渲染器
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.xr.enabled = true; // 启用VR支持
        document.body.appendChild(this.renderer.domElement);

        // VR按钮
        document.body.appendChild(VRButton.createButton(this.renderer));

        // 控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.minDistance = 2;
        this.controls.maxDistance = 20;

        // 移除加载界面
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
        }, 1000);
    }

    createLighting() {
        // 环境光
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        // 主光源
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 10, 7);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        this.scene.add(mainLight);

        // 添加点光源创造氛围
        const spotLight1 = new THREE.SpotLight(0x667eea, 1);
        spotLight1.position.set(-5, 5, 0);
        spotLight1.angle = Math.PI / 4;
        spotLight1.penumbra = 0.5;
        this.scene.add(spotLight1);

        const spotLight2 = new THREE.SpotLight(0x764ba2, 1);
        spotLight2.position.set(5, 5, 0);
        spotLight2.angle = Math.PI / 4;
        spotLight2.penumbra = 0.5;
        this.scene.add(spotLight2);

        // 地面反射光
        const groundLight = new THREE.HemisphereLight(0x444444, 0x222222, 0.3);
        this.scene.add(groundLight);
    }

    createScene() {
        // 这个方法在init中已经调用，照明和场景设置在那里完成
    }

    createGallery() {
        // 地板
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x2d2d44,
            roughness: 0.8,
            metalness: 0.2
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);

        // 墙壁材质
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: 0x3d3d5c,
            roughness: 0.9,
            metalness: 0.1,
            side: THREE.DoubleSide
        });

        // 后墙
        const backWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 8),
            wallMaterial
        );
        backWall.position.set(0, 4, -10);
        this.scene.add(backWall);

        // 左墙
        const leftWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 8),
            wallMaterial
        );
        leftWall.position.set(-10, 4, 0);
        leftWall.rotation.y = Math.PI / 2;
        this.scene.add(leftWall);

        // 右墙
        const rightWall = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 8),
            wallMaterial
        );
        rightWall.position.set(10, 4, 0);
        rightWall.rotation.y = -Math.PI / 2;
        this.scene.add(rightWall);

        // 天花板
        const ceiling = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 20),
            new THREE.MeshStandardMaterial({
                color: 0x1a1a2e,
                roughness: 1,
                metalness: 0
            })
        );
        ceiling.rotation.x = Math.PI / 2;
        ceiling.position.y = 8;
        this.scene.add(ceiling);

        // 添加装饰性灯光带
        this.createLightStrips();
    }

    createLightStrips() {
        // 创建LED灯光带效果
        const stripGeometry = new THREE.BoxGeometry(0.1, 0.05, 18);
        const stripMaterial = new THREE.MeshBasicMaterial({
            color: 0x667eea
        });

        // 底部灯光带
        const positions = [
            { x: -9.9, y: 0.1, z: 0, rotY: Math.PI / 2 },
            { x: 9.9, y: 0.1, z: 0, rotY: Math.PI / 2 },
            { x: 0, y: 0.1, z: -9.9, rotY: 0 }
        ];

        positions.forEach(pos => {
            const strip = new THREE.Mesh(stripGeometry, stripMaterial.clone());
            strip.position.set(pos.x, pos.y, pos.z);
            strip.rotation.y = pos.rotY;
            this.scene.add(strip);
        });
    }

    createArtworks() {
        // 展品数据
        const artworksData = [
            {
                position: new THREE.Vector3(-5, 2, -9.5),
                size: { width: 3, height: 2 },
                color: 0xff6b6b,
                title: "抽象艺术 #1",
                description: "探索色彩与形状的和谐"
            },
            {
                position: new THREE.Vector3(0, 2, -9.5),
                size: { width: 4, height: 3 },
                color: 0x4ecdc4,
                title: "数字未来",
                description: "科技与艺术的完美融合"
            },
            {
                position: new THREE.Vector3(5, 2, -9.5),
                size: { width: 3, height: 2 },
                color: 0xffe66d,
                title: "光影交响",
                description: "光与影的舞蹈"
            },
            {
                position: new THREE.Vector3(-9.5, 2, -3),
                size: { width: 3, height: 2 },
                color: 0x95e1d3,
                title: "自然之声",
                description: "大自然的色彩语言"
            },
            {
                position: new THREE.Vector3(-9.5, 2, 3),
                size: { width: 3, height: 2 },
                color: 0xf38181,
                title: "情感表达",
                description: "艺术的情感力量"
            },
            {
                position: new THREE.Vector3(9.5, 2, -3),
                size: { width: 3, height: 2 },
                color: 0xaa96da,
                title: "空间探索",
                description: "三维空间的艺术诠释"
            },
            {
                position: new THREE.Vector3(9.5, 2, 3),
                size: { width: 3, height: 2 },
                color: 0xfcbad3,
                title: "梦幻花园",
                description: "想象力的绽放"
            }
        ];

        artworksData.forEach((data, index) => {
            this.createArtwork(data, index);
        });

        // 添加中央雕塑
        this.createCenterSculpture();
    }

    createArtwork(data, index) {
        // 创建画框
        const frameGeometry = new THREE.BoxGeometry(
            data.size.width + 0.2,
            data.size.height + 0.2,
            0.1
        );
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x2c2c54,
            roughness: 0.3,
            metalness: 0.8
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.copy(data.position);
        frame.castShadow = true;
        this.scene.add(frame);

        // 创建画布
        const canvasGeometry = new THREE.PlaneGeometry(
            data.size.width,
            data.size.height
        );
        const canvasMaterial = new THREE.MeshStandardMaterial({
            color: data.color,
            roughness: 0.5,
            metalness: 0.1,
            emissive: data.color,
            emissiveIntensity: 0.1
        });
        const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
        canvas.position.copy(data.position);
        canvas.position.z += 0.06;
        canvas.userData = {
            type: 'artwork',
            title: data.title,
            description: data.description,
            originalColor: data.color
        };
        this.scene.add(canvas);
        this.artworks.push(canvas);

        // 添加聚光灯照在画作上
        const spotLight = new THREE.SpotLight(0xffffff, 0.8);
        spotLight.position.set(
            data.position.x,
            7,
            data.position.z + 3
        );
        spotLight.target = canvas;
        spotLight.angle = Math.PI / 6;
        spotLight.penumbra = 0.3;
        spotLight.castShadow = true;
        this.scene.add(spotLight);
    }

    createCenterSculpture() {
        // 创建基座
        const baseGeometry = new THREE.CylinderGeometry(1, 1.2, 0.5, 32);
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: 0x2c2c54,
            roughness: 0.2,
            metalness: 0.9
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.set(0, 0.25, 0);
        base.castShadow = true;
        base.receiveShadow = true;
        this.scene.add(base);

        // 创建抽象雕塑
        const sculptureGroup = new THREE.Group();

        // 主体
        const mainGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
        const mainMaterial = new THREE.MeshStandardMaterial({
            color: 0x667eea,
            roughness: 0.3,
            metalness: 0.7,
            emissive: 0x667eea,
            emissiveIntensity: 0.2
        });
        const main = new THREE.Mesh(mainGeometry, mainMaterial);
        main.castShadow = true;
        sculptureGroup.add(main);

        // 环绕的环
        const ringGeometry = new THREE.TorusGeometry(0.8, 0.05, 16, 100);
        const ringMaterial = new THREE.MeshStandardMaterial({
            color: 0x764ba2,
            roughness: 0.2,
            metalness: 0.8,
            emissive: 0x764ba2,
            emissiveIntensity: 0.3
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        sculptureGroup.add(ring);

        sculptureGroup.position.set(0, 2, 0);
        sculptureGroup.userData = {
            type: 'sculpture',
            title: "中心雕塑",
            description: "完美的平衡与和谐"
        };
        this.scene.add(sculptureGroup);
        this.artworks.push(sculptureGroup);

        // 雕塑专用光源
        const sculptureLight = new THREE.PointLight(0x667eea, 1, 5);
        sculptureLight.position.set(0, 3, 0);
        this.scene.add(sculptureLight);
    }

    setupControls() {
        const walkBtn = document.getElementById('btn-walk');
        const flyBtn = document.getElementById('btn-fly');
        const resetBtn = document.getElementById('btn-reset');

        walkBtn.addEventListener('click', () => {
            this.isWalkMode = true;
            this.controls.maxPolarAngle = Math.PI / 2;
            this.controls.minDistance = 2;
            this.controls.maxDistance = 20;
            walkBtn.classList.add('active');
            flyBtn.classList.remove('active');
        });

        flyBtn.addEventListener('click', () => {
            this.isWalkMode = false;
            this.controls.maxPolarAngle = Math.PI;
            this.controls.minDistance = 1;
            this.controls.maxDistance = 50;
            flyBtn.classList.add('active');
            walkBtn.classList.remove('active');
        });

        resetBtn.addEventListener('click', () => {
            this.camera.position.set(0, 2, 8);
            this.controls.target.set(0, 0, 0);
            this.controls.update();
        });

        // 默认激活步行模式
        walkBtn.classList.add('active');
    }

    setupEventListeners() {
        // 窗口大小调整
        window.addEventListener('resize', () => this.onWindowResize());

        // 鼠标移动
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));

        // 点击事件
        window.addEventListener('click', (e) => this.onClick(e));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // 射线检测
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.artworks, true);

        const tooltip = document.getElementById('tooltip');

        if (intersects.length > 0) {
            let object = intersects[0].object;
            // 找到包含userData的父对象
            while (object && !object.userData.title && object.parent) {
                object = object.parent;
            }

            if (object && object.userData.title) {
                tooltip.style.display = 'block';
                tooltip.style.left = event.clientX + 15 + 'px';
                tooltip.style.top = event.clientY + 15 + 'px';
                tooltip.innerHTML = `
                    <strong>${object.userData.title}</strong><br>
                    ${object.userData.description}
                `;
                document.body.style.cursor = 'pointer';
            }
        } else {
            tooltip.style.display = 'none';
            document.body.style.cursor = 'default';
        }
    }

    onClick(event) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.artworks, true);

        if (intersects.length > 0) {
            let object = intersects[0].object;
            // 找到包含userData的父对象
            while (object && !object.userData.title && object.parent) {
                object = object.parent;
            }

            if (object && object.userData.title) {
                this.focusOnArtwork(object);
            }
        }
    }

    focusOnArtwork(object) {
        const targetPosition = new THREE.Vector3();
        object.getWorldPosition(targetPosition);

        // 计算新的相机位置
        const offset = new THREE.Vector3(0, 0, 4);
        if (object.userData.type === 'sculpture') {
            offset.set(0, 1, 5);
        }

        // 获取朝向
        const direction = new THREE.Vector3();
        direction.subVectors(this.camera.position, targetPosition).normalize();

        const newPosition = targetPosition.clone().add(direction.multiplyScalar(4));

        // 平滑动画过渡
        this.animateCamera(newPosition, targetPosition);
    }

    animateCamera(targetPosition, lookAt) {
        const startPosition = this.camera.position.clone();
        const startTarget = this.controls.target.clone();
        const duration = 1000; // 1秒
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 缓动函数
            const easeProgress = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            this.camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
            this.controls.target.lerpVectors(startTarget, lookAt, easeProgress);
            this.controls.update();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    animate() {
        this.renderer.setAnimationLoop(() => {
            // 更新控制器
            this.controls.update();

            // 让中心雕塑缓慢旋转
            const sculpture = this.artworks.find(art => art.userData.type === 'sculpture');
            if (sculpture) {
                sculpture.rotation.y += 0.005;
                sculpture.children[0].rotation.x += 0.003;
                sculpture.children[0].rotation.z += 0.002;
            }

            // 渲染
            this.renderer.render(this.scene, this.camera);
        });
    }
}

// 初始化VR展厅
new VRGallery();
