import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WaterResource, ResourceStatus } from '@/types';
// @ts-ignore - ThreeGlobe doesn't have TypeScript definitions
import ThreeGlobeLib from 'three-globe';

interface GlobeVisualizationProps {
  resources: WaterResource[];
  onResourceSelect: (resource: WaterResource) => void;
}

// Type definition for globe object
interface GlobeObject extends THREE.Object3D {
  globeImageUrl: (url: string) => GlobeObject;
  bumpImageUrl: (url: string) => GlobeObject;
  atmosphereColor: (color: string | THREE.Color) => GlobeObject;
  atmosphereAltitude: (altitude: number) => GlobeObject;
  hexPolygonsData: (data: any[]) => GlobeObject;
  hexPolygonResolution: (resolution: number) => GlobeObject;
  hexPolygonMargin: (margin: number) => GlobeObject;
  hexPolygonColor: (callback: ((obj: any) => string | THREE.Color) | string | THREE.Color) => GlobeObject;
  pointsData: (data: any[]) => GlobeObject;
  pointColor: (callback: ((obj: any) => string | THREE.Color) | string | THREE.Color) => GlobeObject;
  pointRadius: (callback: ((obj: any) => number) | number) => GlobeObject;
  pointsMerge: (merge: boolean) => GlobeObject;
  pointAltitude: (callback: ((obj: any) => number) | number) => GlobeObject;
  pointLabel: (callback: (obj: any) => string) => GlobeObject;
  labelsData: (data: any[]) => GlobeObject;
  labelLat: (callback: ((obj: any) => number) | string) => GlobeObject;
  labelLng: (callback: ((obj: any) => number) | string) => GlobeObject;
  labelText: (callback: ((obj: any) => string) | string) => GlobeObject;
  labelSize: (callback: ((obj: any) => number) | number) => GlobeObject;
  labelDotRadius: (callback: ((obj: any) => number) | number) => GlobeObject;
  labelColor: (callback: ((obj: any) => string | THREE.Color) | string | THREE.Color) => GlobeObject;
  labelResolution: (resolution: number) => GlobeObject;
  labelAltitude: (callback: ((obj: any) => number) | number) => GlobeObject;
  customLayerData: (data: any[]) => GlobeObject;
  customThreeObject: (callback: (obj: any) => THREE.Object3D) => GlobeObject;
  customThreeObjectUpdate: (callback: (obj: any, objThree: THREE.Object3D) => void) => GlobeObject;
  material: (material?: THREE.Material) => THREE.Material;
  ringsData: (data: any[]) => GlobeObject;
  ringLat: (callback: ((obj: any) => number) | string) => GlobeObject;
  ringLng: (callback: ((obj: any) => number) | string) => GlobeObject;
  ringColor: (callback: ((obj: any) => string | THREE.Color) | string | THREE.Color) => GlobeObject;
  ringResolution: (resolution: number) => GlobeObject;
  ringMaxRadius: (callback: ((obj: any) => number) | number) => GlobeObject;
  ringPropagationSpeed: (callback: ((obj: any) => number) | number) => GlobeObject;
  ringRepeatPeriod: (callback: ((obj: any) => number) | number) => GlobeObject;
  objectThreeObject: (callback: (obj: any) => THREE.Object3D) => GlobeObject;
  objectLat: (callback: ((obj: any) => number) | string) => GlobeObject;
  objectLng: (callback: ((obj: any) => number) | string) => GlobeObject;
  objectAltitude: (callback: ((obj: any) => number) | number) => GlobeObject;
}

const GlobeVisualization: React.FC<GlobeVisualizationProps> = ({ resources, onResourceSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const globeRef = useRef<GlobeObject | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Parse resource data for the globe
  const getGlobeData = useCallback(() => {
    return resources.map(resource => ({
      id: resource.id,
      lat: resource.latitude, 
      lng: resource.longitude,
      name: resource.name,
      region: resource.region,
      country: resource.country,
      status: resource.status,
      altitude: 0.05,
      radius: resource.status === ResourceStatus.CRITICAL ? 0.25 : 
             resource.status === ResourceStatus.NEEDS_ATTENTION ? 0.2 : 0.15,
      color: resource.status === ResourceStatus.CRITICAL ? '#FF2E93' : 
             resource.status === ResourceStatus.NEEDS_ATTENTION ? '#FFD700' : '#00E5E0',
      irr: resource.irr,
      totalFunding: resource.totalFunding,
      availableForDAO: resource.availableForDAO,
    }));
  }, [resources]);

  // Setup and initialize the 3D globe
  useEffect(() => {
    if (!containerRef.current) return;
    setIsLoading(true);

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#040B1B'); // Deep space background
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      50, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 250;
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    
    // Clean up if there's an existing renderer
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 120;
    controls.maxDistance = 400;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;
    
    // Setup Globe using ThreeGlobe library
    const Globe = new ThreeGlobeLib() as unknown as GlobeObject;
    
    // Load textures
    Globe
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg') // Night view of Earth with city lights
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      // Customize atmosphere to give it a blue glow
      .atmosphereColor('#14b8a6') // Turquoise glow
      .atmosphereAltitude(0.15)
      // Set the size and position
      .pointOfView({ altitude: 2.5 });
      
    // Scale it properly
    Globe.scale.set(100, 100, 100);
    
    // Add globe to the scene
    scene.add(Globe);
    globeRef.current = Globe;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.3);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add a subtle point light for water highlights
    const waterLight = new THREE.PointLight(0x14b8a6, 1, 300);
    waterLight.position.set(100, 100, 100);
    scene.add(waterLight);
    
    // Animation loop
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      
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
    
    // Wait for resources to load
    setTimeout(() => setIsLoading(false), 1000);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);
  
  // Add water data points and markers to the globe
  useEffect(() => {
    if (!globeRef.current || !sceneRef.current || isLoading) return;
    
    const globeData = getGlobeData();
    
    // Add water resource markers
    globeRef.current
      // Main points
      .pointsData(globeData)
      .pointColor('color')
      .pointRadius('radius')
      .pointsMerge(false)
      .pointAltitude('altitude')
      .pointLabel((d: any) => {
        return `
          <div class="globe-tooltip">
            <div class="globe-tooltip-header">${d.name}</div>
            <div class="globe-tooltip-content">
              <div>${d.region}, ${d.country}</div>
              <div>Status: ${d.status}</div>
              ${d.irr ? `<div>Annual Return: ${d.irr}%</div>` : ''}
              ${d.totalFunding ? `<div>Total Funding: $${d.totalFunding.toLocaleString()}</div>` : ''}
            </div>
          </div>
        `;
      })
      
      // Add labels that appear when zoomed in
      .labelsData(globeData)
      .labelLat('lat')
      .labelLng('lng')
      .labelText('name')
      .labelSize(1.5)
      .labelDotRadius(0.5)
      .labelColor((d: any) => d.color)
      .labelResolution(2)
      .labelAltitude(0.01)
      
      // Add ring effects for Critical and Needs Attention resources
      .ringsData(globeData.filter((d: any) => 
        d.status === ResourceStatus.CRITICAL || d.status === ResourceStatus.NEEDS_ATTENTION
      ))
      .ringLat('lat')
      .ringLng('lng')
      .ringColor('color')
      .ringMaxRadius(2)
      .ringPropagationSpeed(3)
      .ringRepeatPeriod((d: any) => d.status === ResourceStatus.CRITICAL ? 1000 : 2000);
      
    // Create a hexagonal grid of water-related areas (rivers, lakes, oceans)
    const waterHexData = [];
    const numPoints = 100;
    
    for (let i = 0; i < numPoints; i++) {
      const lat = (Math.random() - 0.5) * 180;
      const lng = (Math.random() - 0.5) * 360;
      
      // Make sure points are more concentrated in areas with actual water
      // This is a simple approximation - real data would be better
      const isWaterRegion = Math.random() > 0.3; // 70% chance of being a water region
      
      if (isWaterRegion) {
        waterHexData.push({ lat, lng });
      }
    }
    
    globeRef.current
      .hexPolygonsData(waterHexData)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.3)
      .hexPolygonColor(() => {
        const color = new THREE.Color();
        color.setHSL(0.5 + Math.random() * 0.1, 0.6, 0.6); // Bluish color with slight variation
        return color;
      });
  
    // Add click event to select resources
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current || !cameraRef.current || !globeRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);
      
      // Find intersections with the globe
      const globeIntersects = raycaster.intersectObject(globeRef.current, true);
      
      if (globeIntersects.length > 0) {
        // Check if the intersection has a userData with resourceId
        let selectedObject = globeIntersects[0].object;
        while (selectedObject && (!selectedObject.userData || !selectedObject.userData.__data)) {
          selectedObject = selectedObject.parent as THREE.Object3D;
        }
        
        if (selectedObject && selectedObject.userData && selectedObject.userData.__data) {
          const data = selectedObject.userData.__data;
          if (data.id) {
            setSelectedMarker(data.id);
            const selectedResource = resources.find(r => r.id === data.id);
            if (selectedResource) {
              onResourceSelect(selectedResource);
            }
          }
        }
      }
    };
    
    containerRef.current?.addEventListener('click', handleClick);
    
    return () => {
      containerRef.current?.removeEventListener('click', handleClick);
    };
  }, [resources, onResourceSelect, getGlobeData, isLoading]);
  
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
      controlsRef.current.reset();
      cameraRef.current.position.z = 250;
      controlsRef.current.update();
    }
  };
  
  const toggleAutoRotate = () => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
    }
  };
  
  return (
    <div className="lg:w-7/12 h-[500px] globe-container relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <div className="text-primary text-xl">Loading Earth...</div>
        </div>
      )}
      
      <div ref={containerRef} className="w-full h-full"></div>
      
      {/* Globe Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="flex space-x-2 bg-background/60 backdrop-blur-sm rounded-full p-2 shadow-lg">
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            onClick={handleZoomIn}
            title="Zoom In"
          >
            <span className="material-icons text-white">add</span>
          </button>
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            <span className="material-icons text-white">remove</span>
          </button>
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            onClick={toggleAutoRotate}
            title="Toggle Rotation"
          >
            <span className="material-icons text-white">sync</span>
          </button>
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            onClick={handleReset}
            title="Reset View"
          >
            <span className="material-icons text-white">refresh</span>
          </button>
        </div>
      </div>
      
      {/* Tooltip styles */}
      <style jsx global>{`
        .globe-tooltip {
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid #14b8a6;
          border-radius: 4px;
          color: white;
          padding: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          width: 160px;
          pointer-events: none;
        }
        .globe-tooltip-header {
          color: #14b8a6;
          font-weight: bold;
          margin-bottom: 4px;
          border-bottom: 1px solid rgba(20, 184, 166, 0.3);
          padding-bottom: 4px;
        }
        .globe-tooltip-content {
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
};

export default GlobeVisualization;
