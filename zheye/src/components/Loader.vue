<template>
  <Teleport to="#back">
    <div class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
      :style="{ backgroundColor: background || '' }">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
          <!-- {{ text || 'loading' }} -->
        </div>
        <p v-if="text" class="text-primary small">{{ text }}</p>
      </div>
    </div>
  </Teleport>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import useDOMCreate from '@/hooks/useDOMCreate'
export default defineComponent({
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup () {
    useDOMCreate('back')
  }
})
</script>

<style>
.loading-container {
  background: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}

.loading-container {
  text-align: center;
}
</style>
