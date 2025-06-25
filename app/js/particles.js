// Three.js Particle System
const initParticles = () => {
    try {
        console.log('Initializing particles...');
        
        // Create scene
        const scene = new THREE.Scene();
        console.log('Scene created');
        
        // Create camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        console.log('Camera created');
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        const container = document.getElementById('particles-container');
        if (!container) {
            throw new Error('Particles container not found');
        }
        container.appendChild(renderer.domElement);
        console.log('Renderer created and added to container');
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;
        
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 5; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        console.log('Particles geometry created');
        
        // Create material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.096,
            color: 0x00e0ff,
            transparent: true,
            opacity: 0.8
        });
        
        // Create mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        console.log('Particles mesh created and added to scene');
        
        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0001;
            particlesMesh.rotation.y += 0.0001;
            
            renderer.render(scene, camera);
        };
        
        animate();
        console.log('Animation started');
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
    } catch (error) {
        console.error('Error initializing particles:', error);
    }
};

// Initialize particles when the page loads
window.addEventListener('load', () => {
    console.log('Window loaded, initializing particles...');
    initParticles();
}); 