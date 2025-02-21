<template>
  <Teleport to="#modal">
    <div class="modal" v-if="isOpen">
        <h2><slot>this is a modal</slot></h2>
        <button @click="buttonClick">close</button>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'MyModal',
    props: {
        isOpen: Boolean,
    },
    emits: {
      'close-modal': null
    },
    setup(props, context) {
      
      const buttonClick = () => {
        console.log('button clicked')
        context.emit('close-modal')
      }
      return {
        buttonClick
      }
    }
});
</script>

<style scoped>
.modal {
    width: 200px;
    height: 200px;
    border: 1px solid black;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
}
</style>