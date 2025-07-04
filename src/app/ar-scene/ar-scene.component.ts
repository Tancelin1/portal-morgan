import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  standalone: true,
  selector: 'app-camera-ar',
  imports: [CommonModule],
  template: `
    <div style="position: relative; width: 100vw; height: 100vh; overflow: hidden;">
      <!-- Caméra vidéo -->
      <video #video
        autoplay
        muted
        playsinline
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; background: black;">
      </video>

      <!-- Canvas Three.js -->
      <div #rendererContainer
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2;">
      </div>
    </div>
  `,
})
export class CameraArComponent implements AfterViewInit {
  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  async ngAfterViewInit(): Promise<void> {
    const video = this.videoRef.nativeElement;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, audio: false
      });

      video.srcObject = stream;

      // 🟡 Nécessaire sur certains navigateurs pour forcer l'affichage
      await video.play();
    } catch (err) {
      console.error('Erreur d’accès à la caméra :', err);
      return;
    }

    // 🎨 Création de la scène 3D
    const scene = new THREE.Scene();

    // Sky globe
    const loader = new THREE.TextureLoader();

    // Cube de test
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.MeshStandardMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5 })
    );
    cube.position.set(0, 0, -1);
    scene.add(cube);

    // Lumière simple
    scene.add(new THREE.AmbientLight(0xffffff));

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    camera.position.z = 0;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    this.rendererContainer.nativeElement.appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }
}
