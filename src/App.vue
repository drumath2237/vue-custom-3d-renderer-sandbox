<script setup lang="ts">
import SceneVue from '../lib/SceneVue.vue'
import { vec3 } from '@babylonjs/lite'
import { DirectionalLight, Material, Box, Sphere } from '../lib/nodeOps'
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>

  <SceneVue>
    <DirectionalLight :direction="vec3(-0.5, -1, 1)" />
    <Box :position="vec3(0, 0.5, 0)" :size="0.5">
      <Material :color="{ r: 1, g: 0, b: 0 }" />
      <Sphere :diameter="0.3" :position="vec3(0.5, 0, 0)">
        <Material :color="{ r: 1, g: 1, b: 1 }" />
      </Sphere>
      <Box :position="vec3(0, -0.5, 0)" :size="0.5">
        <Material :color="{ r: 0, g: 0, b: 1 }" />
      </Box>
    </Box>
  </SceneVue>
</template>

<style scoped></style>
