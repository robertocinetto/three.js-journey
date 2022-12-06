import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 'blue' }))
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 'green' }))
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 'red' }))
cube2.position.x = 3
cube3.position.x = -3
group.add(cube1)
group.add(cube2)
group.add(cube3)

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// mesh.position.set(1, 0, -1)
// scene.add(mesh)

//Scale
// mesh.scale.x = 2
// mesh.scale.z = 2

//Rotation
// mesh.rotation.x = 1

//Axis helpers
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
// camera.position.set(1, 2, 5)
// camera.lookAt(mesh.position)
scene.add(camera)

// console.log(mesh.position.distanceTo(camera.position))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
