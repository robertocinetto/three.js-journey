//Creating a scene
const scene = new THREE.Scene()

//Creating a box
const geometry = new THREE.BoxGeometry(1, 1, 1)

//Creating a material
const material = new THREE.MeshBasicMaterial({ color: 'violet' })

//Creating a mesh
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

//Sizes
const sizes = {
  width: 800,
  height: 600,
}

//Creating a camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Creating a renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)
