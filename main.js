// 3D background with Three.js (CDN import)
import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";

let scene, camera, renderer;
let stars, pulsar;

function init3D() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 26;

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Starfield
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 1500;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);

  const color = new THREE.Color();
  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    positions[i3 + 0] = (Math.random() - 0.5) * 120;
    positions[i3 + 1] = (Math.random() - 0.5) * 70;
    positions[i3 + 2] = (Math.random() - 0.5) * 40;

    const tint = 0.6 + Math.random() * 0.4;
    color.setRGB(1, 1, tint);
    colors[i3 + 0] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const starMaterial = new THREE.PointsMaterial({
    size: 0.35,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
  });

  stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // Pulsating "nova" sphere
  const pulsarGeo = new THREE.SphereGeometry(5, 64, 64);
  const pulsarMat = new THREE.MeshStandardMaterial({
    color: 0xffcf3c,
    metalness: 0.4,
    roughness: 0.2,
    emissive: 0xffcf3c,
    emissiveIntensity: 0.6,
  });
  pulsar = new THREE.Mesh(pulsarGeo, pulsarMat);
  scene.add(pulsar);

  const light = new THREE.PointLight(0xffffff, 1.8, 200);
  light.position.set(10, 10, 20);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x403080, 0.9);
  scene.add(ambient);

  window.addEventListener("resize", handleResize);
  document.addEventListener("pointermove", handlePointerMove);

  animate();
}

function handleResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let pointerX = 0;
let pointerY = 0;

function handlePointerMove(event) {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = (event.clientY / window.innerHeight) * 2 - 1;
  pointerX = x;
  pointerY = y;
}

function animate() {
  requestAnimationFrame(animate);
  if (!renderer || !scene || !camera) return;

  const time = performance.now() * 0.0004;

  if (stars) {
    stars.rotation.y = time * 0.4;
  }

  if (pulsar) {
    pulsar.rotation.y += 0.004;
    pulsar.rotation.x += 0.002;

    const scale = 1 + Math.sin(time * 4) * 0.06;
    pulsar.scale.setScalar(scale);

    const targetX = pointerX * 4;
    const targetY = -pointerY * 3;
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  }

  renderer.render(scene, camera);
}

// Parallax tilt on hero card
function initTilt() {
  const card = document.querySelector("[data-tilt]");
  if (!card) return;

  const strength = 16;

  function handleMouseMove(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * -strength;
    const rotateY = ((x - midX) / midX) * strength;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  }

  function resetTilt() {
    card.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
  }

  card.addEventListener("mousemove", handleMouseMove);
  card.addEventListener("mouseleave", resetTilt);
}

// Smooth scroll for "Découvrir l’expérience" button
function initSmoothScroll() {
  document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetSelector = btn.getAttribute("data-scroll-to");
      const target = targetSelector
        ? document.querySelector(targetSelector)
        : null;
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// Reveal on scroll
function initReveal() {
  const section = document.querySelector("#about");
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.6,
    }
  );

  observer.observe(section);
}


// Scroll spy + page progress & active nav link
function initScrollSpy() {
  const sectionSelectors = [
    "#top",
    "#section-objectifs",
    "#section-parcours",
    "#section-coaching",
    "#section-progression",
    "#section-temoignages",
    "#section-reservation",
  ];

  const dots = Array.from(
    document.querySelectorAll(".page-progress__dot")
  );
  const navLinks = Array.from(
    document.querySelectorAll(".nav__links a")
  );

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetSelector = dot.getAttribute("data-target");
      const target = targetSelector
        ? document.querySelector(targetSelector)
        : null;
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  function update() {
    let currentId = "#top";
    const scrollY = window.scrollY;
    const offset = window.innerHeight * 0.3;

    sectionSelectors.forEach((selector) => {
      const section = document.querySelector(selector);
      if (!section) return;
      const top = section.offsetTop;
      if (scrollY + offset >= top) {
        currentId = selector;
      }
    });

    dots.forEach((dot) => {
      const target = dot.getAttribute("data-target");
      dot.classList.toggle("is-active", target === currentId);
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("nav__link--active", href === currentId);
    });
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}

// Scroll-driven modules syncing text & visuals
function initScrollModules() {
  const modules = document.querySelectorAll(".scroll-module");
  const visuals = document.querySelectorAll(".scroll-modules__image");
  if (!modules.length || !visuals.length) return;

  const visualMap = {};
  visuals.forEach((visual) => {
    const key = visual.dataset.moduleVisual;
    if (key) {
      visualMap[key] = visual;
    }
  });

  function setActive(key) {
    modules.forEach((mod) => {
      mod.classList.toggle("is-active", mod.dataset.module === key);
    });
    visuals.forEach((visual) => {
      visual.classList.toggle("is-active", visual.dataset.moduleVisual === key);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const key = entry.target.dataset.module;
          if (key && visualMap[key]) {
            setActive(key);
          }
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "-10% 0px -40% 0px",
    }
  );

  modules.forEach((mod) => observer.observe(mod));

  const initialKey = modules[0].dataset.module;
  if (initialKey) {
    setActive(initialKey);
  }
}

// Mobile navigation overlay
function initNavOverlay() {
  const toggle = document.querySelector(".nav__toggle");
  const overlay = document.getElementById("nav-overlay");
  if (!toggle || !overlay) return;

  const closeBtn = overlay.querySelector("[data-nav-close]");
  const links = overlay.querySelectorAll("a[data-nav-link]");

  function open() {
    overlay.classList.add("nav-overlay--visible");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("nav-overlay--visible");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", open);
  if (closeBtn) {
    closeBtn.addEventListener("click", close);
  }
  links.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href");
      const target = href ? document.querySelector(href) : null;
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      close();
    });
  });
}

// Fake form submission (for demo)
function initForm() {
  const form = document.getElementById("reservation-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.classList.add("form--sent");
    const button = form.querySelector("button[type='submit']");
    if (button) {
      button.textContent = "Merci, on te contacte très vite ✨";
      button.disabled = true;
    }
  });
}

// Footer year
function setYear() {
  const el = document.getElementById("year");
  if (el) {
    el.textContent = new Date().getFullYear();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  init3D();
  initTilt();
  initSmoothScroll();
  initReveal();
  initScrollSpy();
  initScrollModules();
  initNavOverlay();
  initForm();
  setYear();
});

