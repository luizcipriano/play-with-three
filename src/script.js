import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { gsap } from 'gsap';

/**
 * Base
 */
// Debug
const gui = new dat.GUI()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( '#000' ); // white
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
let matcapTexture = textureLoader.load('textures/matcaps/7.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        // Material
        // const material = new THREE.MeshNormalMaterial()
        // material.wireframe = true

        // create a material with an initial texture
        var textureLoader = new THREE.TextureLoader();
        let matcapTexture = textureLoader.load('textures/matcaps/8.png')
        var material = new THREE.MeshBasicMaterial({ map: matcapTexture });

        // create a dat.GUI instance
        var gui = new dat.GUI();

        // add a texture controller to the GUI
        var textureController = gui.add(material, 'texture', {
            'Texture 1': textureLoader.load('textures/matcaps/1.png'),
            'Texture 2': textureLoader.load('textures/matcaps/2.png'),
            'Texture 3': textureLoader.load('textures/matcaps/3.png'),
            'Texture 4': textureLoader.load('textures/matcaps/4.png'),
            'Texture 5': textureLoader.load('textures/matcaps/5.png'),
            'Texture 6': textureLoader.load('textures/matcaps/6.png'),
            'Texture 7': textureLoader.load('textures/matcaps/7.png'),
            'Texture 8': textureLoader.load('textures/matcaps/8.png'),
            'Texture 9': textureLoader.load('textures/matcaps/9.png'),
            'Texture 10': textureLoader.load('textures/matcaps/10.png'),
            'Texture 11': textureLoader.load('textures/matcaps/11.png'),
            'Texture 12': textureLoader.load('textures/matcaps/12.png'),
        });

        // listen for changes to the texture controller
        textureController.onChange(function(value) {
            material.map = value;
            material.needsUpdate = true;
        });
             // add a wireframe controller to the GUI
             var wireframeController = gui.add(material, 'wireframe');
             wireframeController.onChange(function(value) {
                 material.wireframe = value;
                 material.needsUpdate = true;
             });
                     // add a color controller to the GUI
            var colorController = gui.addColor(material, 'color');
            colorController.onChange(function(value) {
                material.color = new THREE.Color(value);
                material.needsUpdate = true;
            });
            gui.addColor(scene, 'background').onChange(function(value) {
                scene.background = new THREE.Color(value);
              });
     
        // Text
        const textGeometry = new TextGeometry(
            'WeeFront',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()

        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        gsap.to(text.rotation, { 
            duration: 100, 
            y: (Math.PI * 2)*-1, 
            repeat: -1, 
            ease: "linear" 
          });
     
        // Donuts
        const donutGeometry =  new THREE.TorusGeometry( .5, .2, 16, 100 );

        for(let i = 0; i < 100; i++)
        {
            const donut = new THREE.Mesh(donutGeometry, material)
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            donut.scale.set(scale, scale, scale)
            gsap.to(donut.rotation, {duration:100, y:  Math.PI * 2, repeat: -1, ease: "none"});
            scene.add(donut)
        }
        let button = {
            more: function() {
              for(let i = 0; i < 100; i++) {
                const donut = new THREE.Mesh(donutGeometry, material)
                donut.position.x = (Math.random() - 0.5) * 10
                donut.position.y = (Math.random() - 0.5) * 10
                donut.position.z = (Math.random() - 0.5) * 10
                donut.rotation.x = Math.random() * Math.PI
                donut.rotation.y = Math.random() * Math.PI
                const scale = Math.random()
                donut.scale.set(scale, scale, scale)
                gsap.to(donut.rotation, {duration:100, y:  Math.PI * 2, repeat: -1, ease: "none"});
                scene.add(donut)
    
              }
            }
          };
          gui.add(button, 'more');
    }
    
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()