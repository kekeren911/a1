import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

// ===== 全局变量 =====
let scene, camera, renderer, controls;
let artworks = [];
let raycaster, mouse;
let selectedArtwork = null;

// ===== 展品数据 =====
const artworkData = [
    {
        title: "星空之梦",
        artist: "梵高风格",
        description: "这幅作品展现了浩瀚星空与内心梦想的交织，蓝色的漩涡代表着无限的可能性。",
        color: 0x4169E1,
        shape: "canvas"
    },
    {
        title: "金色交响",
        artist: "抽象派",
        description: "金色的几何形态在空间中舞动，象征着光明与希望永远存在。",
        color: 0xFFD700,
        shape: "sculpture"
    },
    {
        title: "绯红之心",
        artist: "现代艺术",
        description: "一颗炽热的心，燃烧着对生活的热爱与对艺术的追求。",
        color: 0xDC143C,
        shape: "sphere"
    },
    {
        title: "翡翠森林",
        artist: "自然主义",
        description: "深邃的绿色唤起内心对自然的向往，让心灵得到净化。",
        color: 0x50C878,
        shape: "canvas"
    },
    {
        title: "海洋之歌",
        artist: "印象派",
        description: "蔚蓝的海浪诉说着古老的传说，每一朵浪花都是一个故事。",
        color: 0x1E90FF,
        shape: "torus"
    }
];

// ===== 初始化场景 =====
function init() {
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);

    // 创建相机
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 1.7, 5);

    // 创建渲染器
    const canvas = document.getElementById('canvas');
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.xr.enabled = true;

    // 添加VR按钮
    const vrButton = VRButton.createButton(renderer);
    document.getElementById('vr-button').addEventListener('click', () => {
        vrButton.click();
    });

    // 添加控制器
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;

    // 创建射线检测器
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // 构建展厅
    buildGallery();

    // 添加灯光
    addLights();

    // 添加事件监听
    addEventListeners();

    // 开始动画
    renderer.setAnimationLoop(animate);
}

// ===== 构建展厅 =====
function buildGallery() {
    // 地板
    const floorGeometry = new THREE.PlaneGeometry(30, 30, 20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        roughness: 0.3,
        metalness: 0.6
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // 添加网格线效果
    const gridHelper = new THREE.GridHelper(30, 30, 0x667eea, 0x2a2a4e);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // 天花板 - 加上发光效果
    const ceilingGeometry = new THREE.PlaneGeometry(30, 30);
    const ceilingMaterial = new THREE.MeshBasicMaterial({
        color: 0x0f0f1a,
        side: THREE.DoubleSide
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 6;
    scene.add(ceiling);

    // 墙壁
    createWalls();

    // 创建展台和艺术品
    createArtworks();

    // 添加装饰性发光球体
    addAmbientOrbs();
}

// ===== 创建墙壁 =====
function createWalls() {
    const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        roughness: 0.5,
        metalness: 0.3,
        side: THREE.DoubleSide
    });

    // 后墙
    const backWall = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 6),
        wallMaterial
    );
    backWall.position.set(0, 3, -15);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // 左墙
    const leftWall = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 6),
        wallMaterial
    );
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-15, 3, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // 右墙
    const rightWall = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 6),
        wallMaterial
    );
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(15, 3, 0);
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // 添加墙上的发光灯带
    const lightStripGeometry = new THREE.BoxGeometry(30, 0.1, 0.1);
    const lightStripMaterial = new THREE.MeshBasicMaterial({
        color: 0x667eea
    });

    // 顶部灯带
    for (let i = 0; i < 4; i++) {
        const strip = new THREE.Mesh(lightStripGeometry, lightStripMaterial);
        strip.position.set(0, 5.8, -10 + i * 7);
        scene.add(strip);

        const strip2 = new THREE.Mesh(lightStripGeometry, lightStripMaterial);
        strip2.rotation.y = Math.PI / 2;
        strip2.position.set(-10 + i * 7, 5.8, 0);
        scene.add(strip2);
    }
}

// ===== 创建艺术品 =====
function createArtworks() {
    const positions = [
        { x: -8, z: -10, rotY: 0 },
        { x: 0, z: -12, rotY: 0 },
        { x: 8, z: -10, rotY: 0 },
        { x: -10, z: 0, rotY: Math.PI / 2 },
        { x: 10, z: 0, rotY: -Math.PI / 2 }
    ];

    artworkData.forEach((data, index) => {
        const pos = positions[index];

        // 创建展台
        const pedestalGeometry = new THREE.CylinderGeometry(0.8, 1, 1.2, 32);
        const pedestalMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a4e,
            roughness: 0.2,
            metalness: 0.8
        });
        const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
        pedestal.position.set(pos.x, 0.6, pos.z);
        pedestal.castShadow = true;
        pedestal.receiveShadow = true;
        scene.add(pedestal);

        // 展台发光环
        const ringGeometry = new THREE.TorusGeometry(1, 0.05, 16, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: data.color
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(pos.x, 1.21, pos.z);
        scene.add(ring);

        // 创建艺术品
        let artwork;
        const artworkGroup = new THREE.Group();

        switch (data.shape) {
            case 'canvas':
                artwork = createCanvasArtwork(data);
                break;
            case 'sphere':
                artwork = createSphereArtwork(data);
                break;
            case 'sculpture':
                artwork = createSculpture(data);
                break;
            case 'torus':
                artwork = createTorusArtwork(data);
                break;
            default:
                artwork = createCanvasArtwork(data);
        }

        artwork.position.set(pos.x, 2.5, pos.z);
        artwork.rotation.y = pos.rotY;
        artwork.userData = { ...data, id: index };
        artwork.castShadow = true;

        artworkGroup.add(artwork);
        scene.add(artworkGroup);
        artworks.push(artwork);

        // 添加聚光灯照明
        const spotlight = new THREE.SpotLight(data.color, 50);
        spotlight.position.set(pos.x, 5, pos.z + 2);
        spotlight.target = artwork;
        spotlight.angle = Math.PI / 6;
        spotlight.penumbra = 0.3;
        spotlight.castShadow = true;
        spotlight.shadow.mapSize.width = 1024;
        spotlight.shadow.mapSize.height = 1024;
        scene.add(spotlight);
        scene.add(spotlight.target);

        // 添加信息牌
        createInfoLabel(data, pos.x, 2, pos.z + 0.5);
    });
}

// ===== 创建画布艺术 =====
function createCanvasArtwork(data) {
    const group = new THREE.Group();

    // 画框
    const frameGeometry = new THREE.BoxGeometry(2.2, 2.2, 0.1);
    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.8
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    group.add(frame);

    // 画布
    const canvasGeometry = new THREE.PlaneGeometry(2, 2);
    const canvasMaterial = new THREE.MeshStandardMaterial({
        color: data.color,
        emissive: data.color,
        emissiveIntensity: 0.3,
        roughness: 0.5
    });
    const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
    canvas.position.z = 0.06;
    group.add(canvas);

    // 添加艺术纹理细节
    const detailGeometry = new THREE.CircleGeometry(0.3 + Math.random() * 0.4, 32);
    const detailMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(data.color).multiplyScalar(1.5)
    });
    const detail = new THREE.Mesh(detailGeometry, detailMaterial);
    detail.position.set(Math.random() - 0.5, Math.random() - 0.5, 0.07);
    group.add(detail);

    return group;
}

// ===== 创建球形艺术 =====
function createSphereArtwork(data) {
    const group = new THREE.Group();

    const geometry = new THREE.SphereGeometry(0.8, 64, 64);
    const material = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.1,
        metalness: 0.9,
        emissive: data.color,
        emissiveIntensity: 0.2
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    group.add(sphere);

    // 添加轨道环
    const ringGeometry = new THREE.TorusGeometry(1.2, 0.05, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.8
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.5;
    group.add(ring);

    return group;
}

// ===== 创建雕刻艺术 =====
function createSculpture(data) {
    const group = new THREE.Group();

    // 创建多个几何体组合
    for (let i = 0; i < 5; i++) {
        const size = 0.2 + Math.random() * 0.3;
        const geometry = new THREE.OctahedronGeometry(size, 0);
        const material = new THREE.MeshStandardMaterial({
            color: data.color,
            roughness: 0.2,
            metalness: 0.8,
            emissive: data.color,
            emissiveIntensity: 0.3
        });
        const piece = new THREE.Mesh(geometry, material);
        piece.position.set(
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 1.5
        );
        piece.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        piece.castShadow = true;
        group.add(piece);
    }

    return group;
}

// ===== 创建环面艺术 =====
function createTorusArtwork(data) {
    const group = new THREE.Group();

    const geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 128, 32);
    const material = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.1,
        metalness: 0.7,
        emissive: data.color,
        emissiveIntensity: 0.25
    });
    const torus = new THREE.Mesh(geometry, material);
    torus.rotation.x = 0.3;
    torus.castShadow = true;
    group.add(torus);

    return group;
}

// ===== 创建信息标签 =====
function createInfoLabel(data, x, y, z) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 256;

    context.fillStyle = 'rgba(102, 126, 234, 0.9)';
    context.roundRect(0, 0, 512, 256, 20);
    context.fill();

    context.fillStyle = '#ffffff';
    context.font = 'bold 48px Arial';
    context.textAlign = 'center';
    context.fillText(data.title, 256, 80);

    context.font = '32px Arial';
    context.fillText(data.artist, 256, 130);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.position.set(x, y, z);
    sprite.scale.set(1.5, 0.75, 1);
    scene.add(sprite);
}

// ===== 添加环境光球 =====
function addAmbientOrbs() {
    const colors = [0x667eea, 0x764ba2, 0x50C878, 0xFFD700];

    for (let i = 0; i < 15; i++) {
        const geometry = new THREE.SphereGeometry(0.05, 16, 16);
        const material = new THREE.MeshBasicMaterial({
            color: colors[i % colors.length],
            transparent: true,
            opacity: 0.6
        });
        const orb = new THREE.Mesh(geometry, material);
        orb.position.set(
            (Math.random() - 0.5) * 25,
            Math.random() * 4 + 1,
            (Math.random() - 0.5) * 25
        );
        orb.userData.initialY = orb.position.y;
        orb.userData.speed = Math.random() * 0.5 + 0.5;
        orb.userData.offset = Math.random() * Math.PI * 2;
        scene.add(orb);
    }
}

// ===== 添加灯光 =====
function addLights() {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // 主光源
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    // 补光
    const fillLight = new THREE.DirectionalLight(0x667eea, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // 中心装饰光
    const pointLight = new THREE.PointLight(0x667eea, 2, 10);
    pointLight.position.set(0, 3, 0);
    scene.add(pointLight);
}

// ===== 添加事件监听 =====
function addEventListeners() {
    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('click', onMouseClick);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
}

// ===== 窗口调整 =====
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ===== 鼠标点击 =====
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(artworks, true);

    if (intersects.length > 0) {
        // 找到最近的艺术品
        let object = intersects[0].object;
        while (object.parent && !object.userData.title) {
            object = object.parent;
        }

        if (object.userData && object.userData.title) {
            selectArtwork(object);
        }
    }
}

// ===== 鼠标移动 - 高亮效果 =====
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(artworks, true);

    // 重置所有发光效果
    artworks.forEach(artwork => {
        artwork.traverse(child => {
            if (child.material && child.material.emissiveIntensity !== undefined) {
                child.material.emissiveIntensity = 0.2;
            }
        });
    });

    if (intersects.length > 0) {
        let object = intersects[0].object;
        while (object.parent && !object.userData.title) {
            object = object.parent;
        }

        if (object.userData && object.userData.title) {
            object.traverse(child => {
                if (child.material && child.material.emissiveIntensity !== undefined) {
                    child.material.emissiveIntensity = 0.5;
                }
            });
            renderer.domElement.style.cursor = 'pointer';
        }
    } else {
        renderer.domElement.style.cursor = 'default';
    }
}

// ===== 选择艺术品 =====
function selectArtwork(artwork) {
    const data = artwork.userData;
    const infoElement = document.getElementById('artwork-info');

    infoElement.innerHTML = `
        <strong>${data.title}</strong><br>
        <em>${data.artist}</em><br><br>
        ${data.description}
    `;

    infoElement.classList.add('highlight');
    setTimeout(() => infoElement.classList.remove('highlight'), 500);

    // 移动相机聚焦
    const targetPos = new THREE.Vector3();
    artwork.getWorldPosition(targetPos);

    // 平滑过渡相机
    const startPos = camera.position.clone();
    const endPos = new THREE.Vector3(
        targetPos.x + (targetPos.x > 0 ? 3 : -3),
        2.5,
        targetPos.z + 3
    );

    controls.target.copy(targetPos);

    // 简单动画
    let progress = 0;
    const animateCamera = () => {
        progress += 0.02;
        if (progress < 1) {
            camera.position.lerpVectors(startPos, endPos, easeInOutCubic(progress));
            requestAnimationFrame(animateCamera);
        }
    };
    animateCamera();
}

// ===== 缓动函数 =====
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ===== 动画循环 =====
let time = 0;
function animate() {
    time += 0.016;

    // 艺术品轻微浮动和旋转
    artworks.forEach((artwork, index) => {
        if (artwork.children.length > 0) {
            artwork.children[0].position.y = Math.sin(time + index) * 0.05;
            artwork.children[0].rotation.y += 0.002;
        }
    });

    // 环境光球飘动
    scene.children.forEach(child => {
        if (child.userData.initialY !== undefined) {
            child.position.y = child.userData.initialY +
                Math.sin(time * child.userData.speed + child.userData.offset) * 0.3;
        }
    });

    controls.update();
    renderer.render(scene, camera);
}

// ===== 启动应用 =====
init();
