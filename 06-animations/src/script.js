import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

const gui = new GUI()
const parameters = {
  color: 0xffffff,
  cubeZ: 0,
}

// const image = new Image()
// const texture = new THREE.Texture(image)
// image.onload = () => {
//   texture.needsUpdate = true
// }
// image.src = '/textures/door/color.jpg'

const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.png')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const matalnessTexture = textureLoader.load('/textures/door/matalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

colorTexture.minFilter = THREE.NearestFilter

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({
  // color: parameters.color,
  map: colorTexture,
  //   wireframe: true,
})
gui
  .addColor(parameters, 'color') //
  .onChange(() => {
    material.color.set(parameters.color)
  })

const mesh = new THREE.Mesh(geometry, material)
mesh.position.z = -2
gui
  .add(mesh.position, 'y') //
  .min(-3)
  .max(3)
  .step(0.01)
  .name('elevation')

gui
  .add(mesh.position, 'z') //
  .min(-3)
  .max(3)
  .step(0.01)

scene.add(mesh)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// Enable damping
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animations
// gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 })

const clock = new THREE.Clock()

const tick = () => {
  //   const currentTime = Date.now()
  //   const deltaTime = currentTime - time
  //   time = currentTime

  //   mesh.rotation.x += 0.001 * deltaTime
  //   mesh.rotation.y += 0.001 * deltaTime
  controls.update()
  const elapsedTime = clock.getElapsedTime()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

window.requestAnimationFrame(tick)
