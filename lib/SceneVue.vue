<script lang="ts">
import { ref, useTemplateRef, onMounted, h, createRenderer, Fragment } from '@vue/runtime-core'
import { nodeOps } from '../lib/nodeOps'
import { RootObject } from '../lib/elements'

const renderCanvas = useTemplateRef<HTMLCanvasElement>('render-canvas')

const slots = defineSlots<{ default?: () => any }>()
onMounted(() => {
  if (renderCanvas.value) {
    const renderer = createRenderer(nodeOps)
    renderer.render(h(Fragment, null, slots.default?.() ?? []), new RootObject())
  }
})
</script>

<template>
  <canvas ref="render-canvas" />
</template>
