import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WaterResource, ResourceStatus } from '@/types';

interface GlobeVisualizationProps {
  resources: WaterResource[];
  onResourceSelect: (resource: WaterResource) => void;
}

const GlobeVisualization: React.FC<GlobeVisualizationProps> = ({ resources, onResourceSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const markersRef = useRef<THREE.Mesh[]>([]);
  
  // Initialize the 3D globe
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controlsRef.current = controls;
    
    // Create globe (sphere)
    const globeGeometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Create gradient texture for the globe
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d')!;
    const gradient = context.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, '#0B1B3A'); // deep blue
    gradient.addColorStop(1, '#00E5E0'); // turquoise
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
    
    const globeTexture = new THREE.CanvasTexture(canvas);
    const globeMaterial = new THREE.MeshBasicMaterial({ 
      map: globeTexture,
      transparent: true,
      opacity: 0.8
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (sceneRef.current && cameraRef.current && rendererRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (markersRef.current.length > 0) {
        markersRef.current.forEach(marker => {
          sceneRef.current?.remove(marker);
        });
      }
    };
  }, []);
  
  // Add resource markers to the globe
  useEffect(() => {
    if (!sceneRef.current) return;
    
    // Remove existing markers
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(marker => {
        sceneRef.current?.remove(marker);
      });
      markersRef.current = [];
    }
    
    // Add new markers
    resources.forEach(resource => {
      // Convert lat/long to 3D coordinates
      const [lat, lon] = resource.coordinates;
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      
      const x = -2 * Math.sin(phi) * Math.cos(theta);
      const y = 2 * Math.cos(phi);
      const z = 2 * Math.sin(phi) * Math.sin(theta);
      
      // Create marker
      const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      
      // Set color based on status
      let color;
      switch(resource.status) {
        case ResourceStatus.CRITICAL:
          color = 0xFF2E93; // Pink
          break;
        case ResourceStatus.NEEDS_ATTENTION:
          color = 0xFFD700; // Yellow
          break;
        case ResourceStatus.STABLE:
          color = 0x00E5E0; // Turquoise
          break;
        default:
          color = 0x00E5E0;
      }
      
      const markerMaterial = new THREE.MeshBasicMaterial({ color });
      
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(x, y, z);
      marker.userData = { resourceId: resource.id };
      
      sceneRef.current?.add(marker);
      markersRef.current.push(marker);
    });
    
    // Add click event to select resources
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const onClick = (event: MouseEvent) => {
      if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;
      
      // Calculate mouse position in normalized device coordinates
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
      
      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, cameraRef.current);
      
      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(markersRef.current);
      
      if (intersects.length > 0) {
        const resourceId = intersects[0].object.userData.resourceId;
        const selectedResource = resources.find(r => r.id === resourceId);
        
        if (selectedResource) {
          onResourceSelect(selectedResource);
        }
      }
    };
    
    containerRef.current?.addEventListener('click', onClick);
    
    return () => {
      containerRef.current?.removeEventListener('click', onClick);
    };
  }, [resources, onResourceSelect]);
  
  // Controls for zooming and rotating
  const handleZoomIn = () => {
    if (cameraRef.current && controlsRef.current) {
      controlsRef.current.dollyIn(1.2);
      controlsRef.current.update();
    }
  };
  
  const handleZoomOut = () => {
    if (cameraRef.current && controlsRef.current) {
      controlsRef.current.dollyOut(1.2);
      controlsRef.current.update();
    }
  };
  
  const handleReset = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 0, 5);
      controlsRef.current.reset();
    }
  };
  
  return (
    <div className="lg:w-7/12 h-96 globe-container relative">
      <div ref={containerRef} className="w-full h-full"></div>
      
      {/* Globe Controls */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
        <div className="flex space-x-2 bg-background/70 rounded-full p-2">
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            onClick={handleZoomIn}
          >
            <span className="material-icons text-white">add</span>
          </button>
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            onClick={handleZoomOut}
          >
            <span className="material-icons text-white">remove</span>
          </button>
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            onClick={handleReset}
          >
            <span className="material-icons text-white">refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobeVisualization;
