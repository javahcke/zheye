<template>
  <div class="hello">
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const component = defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    props.msg
    context.slots
  }
})
export default component
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
