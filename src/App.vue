<script setup lang="ts">
import V3DScene from '../lib/V3DScene.vue'
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>

  <V3DScene>
    <RotatedCamera />
    <DirectionalLight />

    <Box>
      <StandardMaterial />

      <Sphere>
        <StandardMaterial />
      </Sphere>
    </Box>
  </V3DScene>
</template>

<style scoped></style>
