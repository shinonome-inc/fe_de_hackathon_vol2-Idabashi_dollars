window.addEventListener("DOMContentLoaded", init);

function init() {
  // レンダラーを作成
  const canvasElement = document.querySelector("#myCanvas");
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvasElement,
  });

  // サイズ指定 (画面いっぱい)
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight * 0.9);
  renderer.sortObjects = true;
  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  // シーンを作成
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe0d5c0);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    1000000
  );
  camera.position.set(400, 80, 400);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvasElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  controls.minDistance = 200;
  controls.maxDistance = 700;
  controls.enableZoom = false;
  // 垂直回転を制限 (カメラが裏側に回らないように制限)
  controls.minPolarAngle = 0; // 上方向の制限（真上を見ない）
  controls.maxPolarAngle = Math.PI / 2; // 下方向の制限（裏側を見ない）
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  // 環境マップの読み込み
  const exrLoader = new THREE.EXRLoader();
  exrLoader.load("./goegap_road_4k.exr", function (texture) {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = envMap;

    texture.dispose();
    pmremGenerator.dispose();
  });

  const loader = new THREE.GLTFLoader();
  loader.load(
    "./edo-castle.glb",
    function (glb) {
      const model = glb.scene;
      model.name = "model_castle";
      model.scale.set(50.0, 50.0, 50.0);
      model.position.set(0, -200, 0);
      scene.add(model);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  const particleCount = 2000;
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xa0522d,
    size: 5,
    transparent: true,
    opacity: 0.8,
  });

  const positions = [];
  const windOffsets = []; // 風によるオフセットを管理する配列
  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 500;
    const y = Math.random() * 400;
    const z = (Math.random() - 0.5) * 500;
    positions.push(x, y, z);
    windOffsets.push(Math.random() * 2 * Math.PI); // ランダムな初期オフセットを設定
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  const fallingParticles = new THREE.Points(
    particlesGeometry,
    particlesMaterial
  );
  scene.add(fallingParticles);
  const horizontalParticleCount = 1; // 新しいパーティクルの数
  const horizontalParticlesGeometry = new THREE.BufferGeometry();
  const horizontalParticlesMaterial = new THREE.PointsMaterial({
    color: 0xffffff, // 青っぽい色
    size: 3000,
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  });

  const horizontalPositions = [];
  const horizontalOffsets = []; // 横方向のオフセットを管理
  const innerRadius = 550; // ドーナツの内半径
  const outerRadius = 800; // ドーナツの外半径
  for (let i = 0; i < horizontalParticleCount; i++) {
    let x, y, z, distance;

    // ドーナツ状の範囲にのみ配置
    do {
      x = (Math.random() - 0.5) * 2 * outerRadius; // X軸にランダム配置
      y = (Math.random() - 0.5) * 2 * outerRadius; // Y軸にランダム配置
      z = (Math.random() - 0.5) * 2 * outerRadius; // Z軸にランダム配置
      distance = Math.sqrt(x * x + z * z); // 平面上の距離を計算
    } while (distance < innerRadius || distance > outerRadius); // 内半径～外半径の範囲内に収める

    horizontalPositions.push(x, y, z);
    horizontalOffsets.push(Math.random() * 2 * Math.PI);
  }

  horizontalParticlesGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(horizontalPositions, 3)
  );

  const horizontalParticles = new THREE.Points(
    horizontalParticlesGeometry,
    horizontalParticlesMaterial
  );
  scene.add(horizontalParticles);

  tick();
  function tick() {
    controls.update();

    // 時間の計測
    const time = performance.now() * 0.001;
    const seasonDuration = 10; // 各季節の持続時間 (秒)
    const totalSeasons = 4; // 春夏秋冬
    const currentSeason = Math.floor((time / seasonDuration) % totalSeasons);

    // 各季節の設定
    const seasonColors = [
      { background: 0xbff6f9, particle: 0xff68c3 }, // 春: 青空と桜色
      { background: 0x18f1ff, particle: 0x07e102 }, // 夏: 青空と緑色
      { background: 0xe0d5c0, particle: 0xa0522d }, // 秋: 茶色背景と紅葉
      { background: 0x1c1c1c, particle: 0xffffff }, // 冬: 暗い空と白い雪
    ];

    // 現在の季節の色を取得
    const nextSeason = (currentSeason + 1) % totalSeasons;
    const blendFactor = (time % seasonDuration) / seasonDuration;

    // 背景色の線形補間
    const currentBackground = new THREE.Color(
      seasonColors[currentSeason].background
    );
    const nextBackground = new THREE.Color(seasonColors[nextSeason].background);
    scene.background = currentBackground
      .clone()
      .lerp(nextBackground, blendFactor);

    // パーティクルの色変更
    const currentParticleColor = new THREE.Color(
      seasonColors[currentSeason].particle
    );
    const nextParticleColor = new THREE.Color(
      seasonColors[nextSeason].particle
    );
    particlesMaterial.color = currentParticleColor
      .clone()
      .lerp(nextParticleColor, blendFactor);

    // パーティクルの動き (雪や桜、紅葉の落下)
    const positions = particlesGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += Math.sin(time + windOffsets[i / 3]) * 0.5; // X方向の揺れ
      positions[i + 2] += Math.cos(time + windOffsets[i / 3]) * 0.5; // Z方向の揺れ

      if (currentSeason === 3) {
        // 冬 (雪)
        positions[i + 1] -= 0.6;
      } else {
        positions[i + 1] -= 0.3;
      }

      // パーティクルが画面下に落ちたらリセット
      if (positions[i + 1] < -200) {
        positions[i + 1] = Math.random() * 500 + 500;
      }
    }
    particlesGeometry.attributes.position.needsUpdate = true;
    // 新しいパーティクルの動き
    const horizontalPositions =
      horizontalParticlesGeometry.attributes.position.array;
    for (let i = 0; i < horizontalPositions.length; i += 3) {
      horizontalPositions[i] += Math.sin(time + horizontalOffsets[i / 3]) * 0.5; // X方向の振動
      horizontalPositions[i + 2] +=
        Math.cos(time + horizontalOffsets[i / 3]) * 0.5; // Z方向の振動

      // 内外の範囲に収める
      const currentDistance = Math.sqrt(
        horizontalPositions[i] ** 2 + horizontalPositions[i + 2] ** 2
      );
      if (currentDistance < innerRadius || currentDistance > outerRadius) {
        const angle = Math.atan2(
          horizontalPositions[i + 2],
          horizontalPositions[i]
        );
        horizontalPositions[i] =
          Math.cos(angle) *
          (Math.random() * (outerRadius - innerRadius) + innerRadius);
        horizontalPositions[i + 2] =
          Math.sin(angle) *
          (Math.random() * (outerRadius - innerRadius) + innerRadius);
      }
    }

    horizontalParticlesGeometry.attributes.position.needsUpdate = true;
    // シーンのレンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", onWindowResize);
  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight * 0.9);
    camera.aspect = window.innerWidth / (window.innerHeight * 0.9);
    camera.updateProjectionMatrix();
  }
}
