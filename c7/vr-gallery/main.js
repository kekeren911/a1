import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

// 全局变量
let camera, scene, renderer;
let controls;
let artworks = [];
let raycaster, mouse;
let intersectedObject = null;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();

// 展品数据
const artworkData = [
    {
        title: "星夜幻想",
        description: "这是一幅表现夜空幻想的数字艺术作品。运用了漩涡状的线条和大胆的色彩对比，营造出梦幻般的氛围。",
        artist: "数字艺术家 - AI创作",
        position: { x: -12, y: 2, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    },
    {
        title: "抽象几何",
        description: "探索几何形状与色彩的和谐统一。每一个形状都代表着思想的一个片段，共同构成完整的视觉体验。",
        artist: "现代抽象艺术家",
        position: { x: 0, y: 2, z: -15 },
        rotation: { x: 0, y: 0, z: 0 }
    },
    {
        title: "自然之声",
        description: "这幅作品试图捕捉大自然的声音，通过视觉的形式表现风、水和森林的和谐共鸣。",
        artist: "环保艺术创作者",
        position: { x: 12, y: 2, z: 0 },
        rotation: { x: 0, y: -Math.PI / 2, z: 0 }
    },
    {
        title: "城市脉动",
        description: "夜晚的城市天际线，霓虹闪烁，车流如水。这幅作品捕捉了现代都市的独特魅力和无穷活力。",
        artist: "城市摄影师",
        position: { x: -8, y: 2, z: 12 },
        rotation: { x: 0, y: Math.PI, z: 0 }
    },
    {
        title: "内在探索",
        description: "一场向内的精神之旅，通过对光影和构图的精心安排，引导观众思考生命的深层意义。",
        artist: "哲学艺术家",
        position: { x: 8, y: 2, z: 12 },
        rotation: { x: 0, y: Math.PI, z: 0 }
    },
    {
        title: "未来科技",
        description: "展望科技与人文的未来共生，运用数字技术创造出超越现实的艺术表达形式。",
        artist: "科技艺术先驱",
        position: { x: -12, y: 2, z: -8 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }
];

init();
animate();

function init() {
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    scene.fog = new THREE.Fog(0x1a1a2e, 10, 50);

    // 创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.7, 10);

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    // 控制器
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 1.8;
    controls.minDistance = 2;
    controls.maxDistance = 20;
    controls.target.set(0, 1.7, 0);

    // VR按钮
    document.body.appendChild(VRButton.createButton(renderer));

    // 光照
    setupLighting();

    // 创建展厅
    createGallery();

    // 创建展品
    createArtworks();

    // 交互
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // 事件监听
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onMouseClick);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // UI按钮事件
    document.getElementById('close-info').addEventListener('click', hideInfoPanel);
    document.getElementById('reset-camera').addEventListener('click', resetCamera);
    document.getElementById('toggle-info').addEventListener('click', () => {
        document.getElementById('info-panel').classList.toggle('visible');
    });

    // 隐藏加载提示
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 1000);
}

function setupLighting() {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // 顶部主光源
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(0, 10, 0);
    mainLight.castShadow = true;
    mainLight.shadow.camera.left = -20;
    mainLight.shadow.camera.right = 20;
    mainLight.shadow.camera.top = 20;
    mainLight.shadow.camera.bottom = -20;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    // 聚光灯照亮画作
    const spotlightColors = [0xff6b6b, 0x4ecdc4, 0xffe66d, 0x95e1d3, 0xf38181, 0xa8e6cf];
    artworkData.forEach((artwork, index) => {
        const spotlight = new THREE.SpotLight(spotlightColors[index % spotlightColors.length], 1.5);
        spotlight.position.set(artwork.position.x, 6, artwork.position.z);
        spotlight.target.position.set(artwork.position.x, 2, artwork.position.z);
        spotlight.angle = Math.PI / 6;
        spotlight.penumbra = 0.5;
        spotlight.castShadow = true;
        scene.add(spotlight);
        scene.add(spotlight.target);
    });

    // 墙壁照明
    const wallLight = new THREE.PointLight(0x6699cc, 0.5, 25);
    wallLight.position.set(0, 4, 0);
    scene.add(wallLight);
}

function createGallery() {
    const textureLoader = new THREE.TextureLoader();

    // 地板
    const floorGeometry = new THREE.PlaneGeometry(30, 30);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x2c3e50,
        roughness: 0.8,
        metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // 天花板
    const ceilingGeometry = new THREE.PlaneGeometry(30, 30);
    const ceilingMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        roughness: 1
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 6;
    scene.add(ceiling);

    // 墙壁材质
    const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x34495e,
        roughness: 0.9,
        metalness: 0.1
    });

    // 创建四个墙壁
    const wallHeight = 6;
    const roomSize = 15;

    // 前墙
    const frontWall = new THREE.Mesh(
        new THREE.PlaneGeometry(roomSize * 2, wallHeight),
        wallMaterial
    );
    frontWall.position.set(0, wallHeight / 2, -roomSize);
    scene.add(frontWall);

    // 后墙
    const backWall = new THREE.Mesh(
        new THREE.PlaneGeometry(roomSize * 2, wallHeight),
        wallMaterial
    );
    backWall.position.set(0, wallHeight / 2, roomSize);
    backWall.rotation.y = Math.PI;
    scene.add(backWall);

    // 左墙
    const leftWall = new THREE.Mesh(
        new THREE.PlaneGeometry(roomSize * 2, wallHeight),
        wallMaterial
    );
    leftWall.position.set(-roomSize, wallHeight / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    scene.add(leftWall);

    // 右墙
    const rightWall = new THREE.Mesh(
        new THREE.PlaneGeometry(roomSize * 2, wallHeight),
        wallMaterial
    );
    rightWall.position.set(roomSize, wallHeight / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    scene.add(rightWall);

    // 添加装饰柱子
    const pillarGeometry = new THREE.CylinderGeometry(0.3, 0.3, wallHeight, 16);
    const pillarMaterial = new THREE.MeshStandardMaterial({
        color: 0x5d6d7e,
        roughness: 0.7,
        metalness: 0.3
    });

    const pillarPositions = [
        { x: -14, z: -14 },
        { x: 14, z: -14 },
        { x: -14, z: 14 },
        { x: 14, z: 14 }
    ];

    pillarPositions.forEach(pos => {
        const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
        pillar.position.set(pos.x, wallHeight / 2, pos.z);
        pillar.castShadow = true;
        scene.add(pillar);
    });
}

function createArtworks() {
    const frameWidth = 3;
    const frameHeight = 2;
    const frameDepth = 0.1;

    artworkData.forEach((data, index) => {
        // 创建画框
        const frameGeometry = new THREE.BoxGeometry(frameWidth + 0.2, frameHeight + 0.2, frameDepth);
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            roughness: 0.3,
            metalness: 0.8
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.set(data.position.x, data.position.y, data.position.z);
        frame.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);
        frame.castShadow = true;
        frame.userData = { isInteractable: true, artworkIndex: index };
        scene.add(frame);

        // 创建画作内容
        const canvasGeometry = new THREE.PlaneGeometry(frameWidth, frameHeight);
        const canvasMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL((index * 0.16) % 1, 0.7, 0.5),
            roughness: 0.5,
            metalness: 0.1
        });
        const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
        canvas.position.set(data.position.x, data.position.y, data.position.z + 0.06);
        canvas.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);
        canvas.userData = { isInteractable: true, artworkIndex: index };
        scene.add(canvas);

        // 添加纹理到画作
        addArtworkTexture(canvas, index);

        artworks.push({ frame, canvas, data });
    });
}

function addArtworkTexture(canvas, index) {
    // 为每个画作创建独特的纹理
    const canvasSize = 512;
    const canvas2d = document.createElement('canvas');
    canvas2d.width = canvasSize;
    canvas2d.height = canvasSize * 0.66;
    const ctx = canvas2d.getContext('2d');

    // 背景渐变
    const gradient = ctx.createLinearGradient(0, 0, canvasSize, canvasSize * 0.66);
    const hue = (index * 60) % 360;
    gradient.addColorStop(0, `hsl(${hue}, 70%, 70%)`);
    gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 70%, 50%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasSize, canvasSize * 0.66);

    // 添加抽象图案
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.arc(
            Math.random() * canvasSize,
            Math.random() * canvasSize * 0.66,
            Math.random() * 100 + 20,
            0,
            Math.PI * 2
        );
        ctx.stroke();
    }

    // 添加文字
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`作品 ${index + 1}`, canvasSize / 2, canvasSize * 0.33);

    // 应用纹理
    const texture = new THREE.CanvasTexture(canvas2d);
    canvas.material.map = texture;
    canvas.material.needsUpdate = true;
}

function showInfoPanel(artworkIndex) {
    const data = artworkData[artworkIndex];
    document.getElementById('artwork-title').textContent = data.title;
    document.getElementById('artwork-description').textContent = data.description;
    document.getElementById('artwork-artist').textContent = data.artist;
    document.getElementById('info-panel').classList.add('visible');
}

function hideInfoPanel() {
    document.getElementById('info-panel').classList.remove('visible');
}

function resetCamera() {
    camera.position.set(0, 1.7, 10);
    controls.target.set(0, 1.7, 0);
    controls.update();
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    let foundInteractive = false;
    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.userData.isInteractable) {
            document.body.style.cursor = 'pointer';
            foundInteractive = true;
            break;
        }
    }

    if (!foundInteractive) {
        document.body.style.cursor = 'default';
    }
}

function onMouseClick(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.userData.isInteractable) {
            const artworkIndex = intersects[i].object.userData.artworkIndex;
            showInfoPanel(artworkIndex);
            break;
        }
    }
}

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
            moveForward = true;
            break;
        case 'KeyS':
        case 'ArrowDown':
            moveBackward = true;
            break;
        case 'KeyA':
        case 'ArrowLeft':
            moveLeft = true;
            break;
        case 'KeyD':
        case 'ArrowRight':
            moveRight = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
            moveForward = false;
            break;
        case 'KeyS':
        case 'ArrowDown':
            moveBackward = false;
            break;
        case 'KeyA':
        case 'ArrowLeft':
            moveLeft = false;
            break;
        case 'KeyD':
        case 'ArrowRight':
            moveRight = false;
            break;
    }
}

function updateMovement(delta) {
    const speed = 5.0;

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize();

    if (moveForward || moveBackward) {
        velocity.z = direction.z * speed * delta;
    }
    if (moveLeft || moveRight) {
        velocity.x = direction.x * speed * delta;
    }

    controls.moveRight(velocity.x);
    controls.moveForward(-velocity.z);

    velocity.x = 0;
    velocity.z = 0;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.setAnimationLoop(() => {
        const delta = 0.016;
        updateMovement(delta);
        controls.update();
        renderer.render(scene, camera);
    });
}
