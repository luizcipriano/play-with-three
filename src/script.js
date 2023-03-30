import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { gsap } from 'gsap'
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
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


     // create a material with an initial texture
     var textureLoader = new THREE.TextureLoader();
     let matcapTexture = textureLoader.load('textures/matcaps/8.png')
     const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });


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
         'Texture 13': textureLoader.load('textures/matcaps/13.png'),
         'Texture 14': textureLoader.load('textures/matcaps/14.png'),
         'Texture 15': textureLoader.load('textures/matcaps/15.png'),
         'Texture 16': textureLoader.load('textures/matcaps/16.png'),
         'Texture 17': textureLoader.load('textures/matcaps/17.png'),
         'Texture 18': textureLoader.load('textures/matcaps/18.png'),
         'Texture 19': textureLoader.load('textures/matcaps/19.png'),
         'Texture 20': textureLoader.load('textures/matcaps/20.png'),
         'Texture 21': textureLoader.load('textures/matcaps/21.png'),
         'Texture 22': textureLoader.load('textures/matcaps/22.png'),
         'Texture 23': textureLoader.load('textures/matcaps/23.png'),
         'Texture 24': textureLoader.load('textures/matcaps/24.png'),
         'Texture 25': textureLoader.load('textures/matcaps/25.png'),
         'Texture 26': textureLoader.load('textures/matcaps/26.png'),
         'Texture 27': textureLoader.load('textures/matcaps/27.png'),
         'Texture 28': textureLoader.load('textures/matcaps/28.png'),
         'Texture 29': textureLoader.load('textures/matcaps/29.png')
     });
     
        // listen for changes to the texture controller
        textureController.onChange(function(value) {
            material.matcap = value;
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
     
/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/Comfortaa_Regular.json',
    (font) =>
    {
        // Text
        const textGeometry = new TextGeometry(
            'WeeFront',
            {
                font: font,
                size: 0.2,
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
        console.log(textGeometry)
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        const anotherTextGeometry = new TextGeometry(
            'Creative',
            {
                font: font,
                size: 0.2,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        const anotherText = new THREE.Mesh(anotherTextGeometry, material)
        scene.add(anotherText)
         
        const lastTextGeometry = new TextGeometry(
            'Development',
            {
                font: font,
                size: 0.2,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        const lastText = new THREE.Mesh(lastTextGeometry, material)
        scene.add(lastText)



        gsap.set(anotherText.position, { 
        x:-.6, 
        y:-.4,
        z:-.1
        });
        gsap.set(lastText.position, { 
        x:-.9, 
        y:-.7,
        z:-.1
        });
        // gsap.to(anotherText.position, {
        //     duration: 5,
        //     x: 0,
        //     ease: "linear",
        //     yoyo: true,
        //     repeat: -1
        // })
        // gsap.to(lastText.position, {
        //     duration: 5,
        //     x: 0,
        //     ease: "linear",
        //     yoyo: true,
        //     repeat: -1
        // })

    }
    
)
// donuts
    // Donuts
    const donutGeometry =  new THREE.TorusGeometry(0.3, 0.1, 32, 64 );

    for(let i = 0; i < 200; i++)
    {
        const donut = new THREE.Mesh(donutGeometry, material)
        donut.position.x = (Math.random() - 0.5) * 10
        donut.position.y = (Math.random() - 0.5) * 10
        donut.position.z = (Math.random() - 0.5) * 10
        donut.rotation.x = Math.random() * Math.PI
        donut.rotation.y = Math.random() * Math.PI
        const scale = Math.random()
        donut.scale.set(scale, scale, scale)
        gsap.to(donut.rotation, {duration:100, y:  (Math.PI * 5*(Math.random() - 0.5)), repeat: -1, ease: "none", yoyo: true});
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
            gsap.to(donut.rotation, {duration:100, y:  (Math.PI * 5*(Math.random() - 0.5)), repeat: -1, ease: "none", yoyo: true});
            scene.add(donut)

          }
        }
      };
      gui.add(button, 'more');

            var loader = new SVGLoader();
            loader.load('/img/logo.svg', function (data) {
            var paths = data.paths;
            // ...create a mesh using the paths...
            var shapes = [];
            for (var i = 0; i < paths.length; i++) {
            var path = paths[i];
            var shapes = path.toShapes(true);
            for (var j = 0; j < shapes.length; j++) {
                var shape = shapes[j];
                var geometry = new THREE.ShapeGeometry(shape);
                var mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
                
            }
            }
        });
  
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