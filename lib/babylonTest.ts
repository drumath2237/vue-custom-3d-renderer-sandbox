import {
  addToScene,
  attachControl,
  createBox,
  createDefaultCamera,
  createDirectionalLight,
  createEngine,
  createSceneContext,
  createStandardMaterial,
  registerScene,
  startEngine,
} from '@babylonjs/lite'

async function _main() {
  const renderCanvas = document.getElementById('renderCanvas')
  if (!(renderCanvas instanceof HTMLCanvasElement)) {
    return
  }

  const engine = await createEngine(renderCanvas)
  const scene = createSceneContext(engine)

  const light = createDirectionalLight([1, -1, 1])
  addToScene(scene, light)

  const _camera = createDefaultCamera(scene)
  attachControl(_camera, renderCanvas)

  const box = createBox(engine, 1)
  const material = createStandardMaterial()
  box.material = material
  addToScene(scene, box)

  await registerScene(scene)
  await startEngine(engine)
}
