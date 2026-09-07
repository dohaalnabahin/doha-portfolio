const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Nav: scroll shadow + mobile toggle + active link ---------- */
const topnav = document.getElementById('topnav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');


navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
}));

const sections = ['about', 'skills', 'projects', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navAnchors = Array.from(navLinks.querySelectorAll('a[data-section]'));
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.toggle('active', a.dataset.section === entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => sectionObserver.observe(s));

/* ---------- Project card 3D tilt on mouse move ---------- */
if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.project-row').forEach(card => {
    card.style.perspective = '1000px';
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = (-y * 6).toFixed(2);
      const rotateY = (x * 6).toFixed(2);
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
}

/* ---------- Hero 3D background (Three.js) ---------- */
(function initHeroScene() {
  const canvas = document.getElementById('bg-canvas');
  const hero = document.getElementById('hero');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, hero.clientWidth / hero.clientHeight, 0.1, 100);
  camera.position.z = 9;

  function resize() {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const palette = [0x7C3AED, 0x0E9E92, 0xFF6B4A, 0xE8A400];
  const shapes = [];
  const geometries = [
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.TorusGeometry(0.7, 0.24, 8, 24),
    new THREE.TetrahedronGeometry(1.1, 0)
  ];

          const fixedShapes = [
    { x: 1.5,  y: 4.2,  z: -1.5, scale: 0.55, geoIndex: 0, colorIndex: 0 },
    { x: 4.0,  y: 4.6,  z: -2.5, scale: 0.65, geoIndex: 2, colorIndex: 1 },
    { x: 6.8,  y: 3.4,  z: -1.0, scale: 0.45, geoIndex: 1, colorIndex: 2 },
    { x: 1.0,  y: 1.0,  z: -2.0, scale: 0.5,  geoIndex: 3, colorIndex: 1 },
    { x: 7.2,  y: 0.6,  z: -1.8, scale: 0.6,  geoIndex: 0, colorIndex: 3 },
    { x: 2.2,  y: -2.4, z: -1.2, scale: 0.4,  geoIndex: 2, colorIndex: 2 },
    { x: 6.0,  y: -1.6, z: -2.2, scale: 0.55, geoIndex: 1, colorIndex: 0 },
    { x: 4.5,  y: -3.0, z: -1.5, scale: 0.45, geoIndex: 3, colorIndex: 3 },
    { x: 0.5,  y: -0.5, z: -2.5, scale: 0.5,  geoIndex: 0, colorIndex: 2 },
    { x: 7.5,  y: 2.0,  z: -2.8, scale: 0.4,  geoIndex: 2, colorIndex: 1 },
    { x: 3.0,  y: 5.4,  z: -2.0, scale: 0.4,  geoIndex: 1, colorIndex: 3 },
    { x: 5.5,  y: 5.0,  z: -1.2, scale: 0.5,  geoIndex: 3, colorIndex: 0 },
    { x: 8.2,  y: 4.0,  z: -2.4, scale: 0.35, geoIndex: 0, colorIndex: 2 },
    { x: 2.8,  y: 2.4,  z: -0.8, scale: 0.35, geoIndex: 2, colorIndex: 0 },
    { x: 8.5,  y: -0.6, z: -1.5, scale: 0.5,  geoIndex: 1, colorIndex: 1 },
    { x: 0.2,  y: 2.6,  z: -2.2, scale: 0.45, geoIndex: 3, colorIndex: 2 },
    { x: 5.0,  y: -0.8, z: -2.6, scale: 0.4,  geoIndex: 0, colorIndex: 1 },
    { x: 3.6,  y: -1.6, z: -1.0, scale: 0.55, geoIndex: 2, colorIndex: 3 },
    { x: 7.8,  y: -2.6, z: -2.0, scale: 0.4,  geoIndex: 1, colorIndex: 0 },
    { x: 1.2,  y: -3.4, z: -1.8, scale: 0.45, geoIndex: 3, colorIndex: 1 }
  ];

  const count = window.innerWidth < 700 ? 8 : fixedShapes.length;
  for (let i = 0; i < count; i++) {
    const s = fixedShapes[i];
    const geo = geometries[s.geoIndex];
    const mat = new THREE.MeshBasicMaterial({
      color: palette[s.colorIndex],
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(s.x, s.y, s.z);
    const scale = s.scale;
    mesh.scale.setScalar(scale);
    mesh.userData.spin = {
      x: (Math.random() - 0.5) * 0.004,
      y: (Math.random() - 0.5) * 0.004
    };
    mesh.userData.floatOffset = Math.random() * Math.PI * 2;
    scene.add(mesh);
    shapes.push(mesh);
  }

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5);
    mouseY = (e.clientY / window.innerHeight - 0.5);
  });

  let frame = 0;
  function animate() {
    frame += 1;
    if (!prefersReducedMotion) {
      shapes.forEach(mesh => {
        mesh.rotation.x += mesh.userData.spin.x;
        mesh.rotation.y += mesh.userData.spin.y;
        mesh.position.y += Math.sin(frame * 0.01 + mesh.userData.floatOffset) * 0.0015;
      });
      camera.position.x += (mouseX * 1.4 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 1.0 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
})();
