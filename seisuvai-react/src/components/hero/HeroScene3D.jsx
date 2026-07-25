import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene3D({ isDark }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4.5, 8.5);
    camera.lookAt(0, 0.8, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // ─── LIGHTING — TRADITIONAL FIRE & LUXURY GOLD ───
    const ambientLight = new THREE.AmbientLight(isDark ? 0xffe8bd : 0xfff7ed, 1.4);
    scene.add(ambientLight);

    // Golden Directional Sun
    const sunLight = new THREE.DirectionalLight(0xc8a24b, 2.8);
    sunLight.position.set(6, 12, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    // Fire Flame Base Light (Flickering PointLight)
    const fireLight = new THREE.PointLight(0xf97316, 3.5, 12);
    fireLight.position.set(0, -0.2, 0);
    scene.add(fireLight);

    // Warm Backlight
    const backRimLight = new THREE.PointLight(0xe6c878, 2, 8);
    backRimLight.position.set(-4, 4, -4);
    scene.add(backRimLight);

    // ─── 3D MODEL: TRADITIONAL INDIAN COOKING HANDI (CAULDRON) ───
    const handiGroup = new THREE.Group();

    // 1. Handi Body Curve (Lathe Geometry for authentic bellied shape)
    const points = [];
    points.push(new THREE.Vector2(0, -0.8));
    points.push(new THREE.Vector2(1.8, -0.6));
    points.push(new THREE.Vector2(2.4, 0.2));
    points.push(new THREE.Vector2(2.1, 1.0));
    points.push(new THREE.Vector2(1.5, 1.3));
    points.push(new THREE.Vector2(1.75, 1.45)); // Flared Brass Rim
    points.push(new THREE.Vector2(1.70, 1.50));
    points.push(new THREE.Vector2(1.45, 1.35));

    const handiGeo = new THREE.LatheGeometry(points, 64);
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xc8a24b,
      metalness: 0.88,
      roughness: 0.22,
    });
    const handiBody = new THREE.Mesh(handiGeo, brassMat);
    handiBody.castShadow = true;
    handiBody.receiveShadow = true;
    handiGroup.add(handiBody);

    // Handi Brass Handles (Ring Handles on Left & Right)
    const handleGeo = new THREE.TorusGeometry(0.35, 0.07, 16, 32);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0xe6c878, metalness: 0.95, roughness: 0.15 });

    const leftHandle = new THREE.Mesh(handleGeo, handleMat);
    leftHandle.position.set(-2.0, 1.1, 0);
    leftHandle.rotation.y = Math.PI / 2;
    handiGroup.add(leftHandle);

    const rightHandle = new THREE.Mesh(handleGeo, handleMat);
    rightHandle.position.set(2.0, 1.1, 0);
    rightHandle.rotation.y = Math.PI / 2;
    handiGroup.add(rightHandle);

    // 2. Inner Hot Dish Surface (Rich Aromatic Biryani / Ghee Feast inside)
    const feastGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.1, 32);
    const feastMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Golden saffron rice / gravy
      roughness: 0.6,
      metalness: 0.1,
    });
    const feast = new THREE.Mesh(feastGeo, feastMat);
    feast.position.y = 1.25;
    handiGroup.add(feast);

    // Rice Garnish & Spices inside the Handi
    const cashewGeo = new THREE.TorusGeometry(0.1, 0.04, 8, 16, Math.PI * 1.2);
    const cashewMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.3 });
    for (let i = 0; i < 5; i++) {
      const cashew = new THREE.Mesh(cashewGeo, cashewMat);
      const angle = (i / 5) * Math.PI * 2;
      cashew.position.set(Math.cos(angle) * 0.7, 1.32, Math.sin(angle) * 0.7);
      cashew.rotation.x = Math.PI / 2;
      handiGroup.add(cashew);
    }

    // 3. Traditional Fire Wood Base Stand
    const logGeo = new THREE.CylinderGeometry(0.12, 0.15, 2.2, 12);
    const logMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
    for (let i = 0; i < 4; i++) {
      const log = new THREE.Mesh(logGeo, logMat);
      const angle = (i / 4) * Math.PI * 2;
      log.position.set(Math.cos(angle) * 0.8, -0.9, Math.sin(angle) * 0.8);
      log.rotation.z = Math.PI / 4 * (i % 2 === 0 ? 1 : -1);
      log.rotation.y = angle;
      handiGroup.add(log);
    }

    // Glowing Fire Embers Rocks at Base
    const emberGeo = new THREE.DodecahedronGeometry(0.18);
    const emberMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    for (let i = 0; i < 8; i++) {
      const ember = new THREE.Mesh(emberGeo, emberMat);
      const angle = (i / 8) * Math.PI * 2;
      ember.position.set(Math.cos(angle) * 0.9, -0.85, Math.sin(angle) * 0.9);
      handiGroup.add(ember);
    }

    // 4. Orbiting Floating Spice Elements (Star Anise, Cardamom, Cashews)
    const spicesGroup = new THREE.Group();

    // Star Anise (Custom Octagram shape)
    const starGeo = new THREE.OctahedronGeometry(0.22);
    const starMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 });
    for (let i = 0; i < 4; i++) {
      const spice = new THREE.Mesh(starGeo, starMat);
      const angle = (i / 4) * Math.PI * 2;
      spice.position.set(Math.cos(angle) * 3.2, 1.5 + Math.sin(i) * 0.5, Math.sin(angle) * 3.2);
      spicesGroup.add(spice);
    }

    handiGroup.add(spicesGroup);

    // Position Handi in Scene
    handiGroup.position.y = 0.2;
    handiGroup.rotation.x = 0.25; // Slightly tilted for front-facing 3D depth
    scene.add(handiGroup);

    // ─── 5. PARTICLE SYSTEM A: RISING STEAM SMOKE ───
    const steamCount = 55;
    const steamGeo = new THREE.BufferGeometry();
    const steamPos = new Float32Array(steamCount * 3);
    const steamOpacities = new Float32Array(steamCount);

    for (let i = 0; i < steamCount; i++) {
      steamPos[i * 3] = (Math.random() - 0.5) * 1.8;
      steamPos[i * 3 + 1] = Math.random() * 3 + 1.3;
      steamPos[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
      steamOpacities[i] = Math.random() * 0.5 + 0.2;
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));

    const steamMat = new THREE.PointsMaterial({
      color: 0xffedd5,
      size: 0.18,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    scene.add(steamParticles);

    // ─── PARTICLE SYSTEM B: RISING FIRE SPARKS / EMBERS ───
    const sparkCount = 40;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);

    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3] = (Math.random() - 0.5) * 2.2;
      sparkPos[i * 3 + 1] = Math.random() * 3.5 - 0.5;
      sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
    }

    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));

    const sparkMat = new THREE.PointsMaterial({
      color: 0xf97316,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const sparkParticles = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkParticles);

    // ─── REDUCED MOTION DETECTION ───
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ─── ANIMATION LOOP ───
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        const t = clock.getElapsedTime();

        // Handi rotation & vertical float
        handiGroup.rotation.y = t * 0.3;
        handiGroup.position.y = 0.2 + Math.sin(t * 1.6) * 0.12;

        // Orbiting Spices rotation
        spicesGroup.rotation.y = -t * 0.5;
        spicesGroup.position.y = Math.cos(t * 1.2) * 0.15;

        // Fire Light Flicker Simulation
        fireLight.intensity = 3.2 + Math.sin(t * 12) * 0.6 + Math.cos(t * 8) * 0.4;

        // Rising Steam Smoke Animation
        const sPositions = steamParticles.geometry.attributes.position.array;
        for (let i = 0; i < steamCount; i++) {
          sPositions[i * 3 + 1] += 0.012; // Rise speed
          sPositions[i * 3] += Math.sin(t + i) * 0.004; // Turbulence drift
          if (sPositions[i * 3 + 1] > 4.5) {
            sPositions[i * 3 + 1] = 1.3;
            sPositions[i * 3] = (Math.random() - 0.5) * 1.8;
            sPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
          }
        }
        steamParticles.geometry.attributes.position.needsUpdate = true;

        // Rising Fire Sparks Animation
        const fPositions = sparkParticles.geometry.attributes.position.array;
        for (let i = 0; i < sparkCount; i++) {
          fPositions[i * 3 + 1] += 0.018;
          fPositions[i * 3] += (Math.random() - 0.5) * 0.008;
          if (fPositions[i * 3 + 1] > 3.8) {
            fPositions[i * 3 + 1] = -0.6;
            fPositions[i * 3] = (Math.random() - 0.5) * 2.2;
            fPositions[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
          }
        }
        sparkParticles.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ─── RESIZE HANDLER ───
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative flex items-center justify-center pointer-events-none"
      style={{ minHeight: '360px', maxHeight: '500px', aspectRatio: '1/1' }}
      aria-hidden="true"
    />
  );
}
