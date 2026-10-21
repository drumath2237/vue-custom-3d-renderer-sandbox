<script setup lang="ts">
import SceneVue from '../lib/SceneVue.vue'
import { vec3, createStandardMaterial } from '@babylonjs/lite'
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>

  <SceneVue>
    <DirectionalLight :direction="vec3(1, -1, 1)" />

    <Box :position="vec3()">
      <Sphere>
        <Material :color="{ r: 1, b: 0, g: 1 }" />
      </Sphere>
    </Box>
  </SceneVue>
</template>

<style scoped></style>
