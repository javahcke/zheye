<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-2 text-center">
        <img :src="column.avatar && column.avatar.url" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import PostList from '@/components/PostList.vue'
export default defineComponent({
  components: {
    PostList
  },
  setup () {
    const store = useStore<GlobalDataProps>()

    const route = useRoute()
    const currentId = route.params.id
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })
    // const column = testData.find(c => c.id === currentId)
    const column = computed(() => {
      return store.getters.getColumnById(currentId)
    })
    // const list = testPosts.filter(post => post.columnId === currentId)
    const list = computed(() => {
      return store.getters.getPostsByCid(currentId)
    })

    return {
      route,
      list,
      column
    }
  }
})
</script>
