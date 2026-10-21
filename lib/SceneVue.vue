<script setup lang="ts">
import { useTemplateRef, onMounted, h, createRenderer, Fragment } from '@vue/runtime-core'
import { nodeOps } from '../lib/nodeOps'
import { RootObject, type SceneVueContext } from '../lib/elements'
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

const renderCanvas = useTemplateRef<HTMLCanvasElement>('render-canvas')

const slots = defineSlots<{ default?: () => any }>()
onMounted(async () => {
  if (renderCanvas.value === null) {
    return
  }

  const engine = await createEngine(renderCanvas.value)
  const scene = createSceneContext(engine)
  const camera = createDefaultCamera(scene)
  attachControl(camera, renderCanvas.value, scene)

  const context: SceneVueContext = { engine, renderCanvas: renderCanvas.value, scene }
  const renderer = createRenderer(nodeOps(context))
  renderer.render(h(Fragment, null, slots.default?.() ?? []), new RootObject(context))

  await registerScene(scene)
  await startEngine(engine)
})
</script>

<template>
  <canvas ref="render-canvas" class="render-canvas" />
</template>

<style lang="css" scoped>
.render-canvas {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
</style>
