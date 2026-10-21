import {
  addToScene,
  attachControl,
  createBox,
  createDefaultCamera,
  createDirectionalLight,
  createEngine,
  createSceneContext,
  createSphere,
  createStandardMaterial,
  registerScene,
  startEngine,
} from '@babylonjs/lite'

export async function main() {
  const renderCanvas = document.getElementById('renderCanvas')
  if (!(renderCanvas instanceof HTMLCanvasElement)) {
    return
  }

  const engine = await createEngine(renderCanvas)
  const scene = createSceneContext(engine)
  const camera = createDefaultCamera(scene)
  attachControl(camera, renderCanvas)

  const light = createDirectionalLight([1, -1, 1])
  addToScene(scene, light)

  const box = createBox(engine, 1)
  const material = createStandardMaterial()
  box.material = material
  addToScene(scene, box)

  const sphere = createSphere(engine)
  sphere.parent = box

  await registerScene(scene)
  await startEngine(engine)
}
