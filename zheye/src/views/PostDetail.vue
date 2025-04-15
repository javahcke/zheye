<template>
  <div class="post-detail-page">
    <modal title="删除文章" :visible="modalIsVisible" @modal-on-close="modalIsVisible = false" @modal-on-confirm="handleDeletePost">
      <p>确定要删除这篇帖子吗？</p>
    </modal>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentImageUrl" alt="currentPost.title" class="rounded-lg img-fluid my-4" v-if="currentImageUrl">
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author" v-if="typeof currentPost.author === 'object'"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic" style="text-align: right;">发表于：{{currentPost.createdAt}}</span>
      </div>
      <div v-html="currentHtml"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link :to="{name: 'createPost', query: {id: currentPost._id}}" type="button" class="btn btn-success">编辑</router-link>
        <button type="button" class="btn btn-danger" @click="modalIsVisible = true">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { GlobalDataProps, PostProps, ImageProps, UserProps, ResponseType } from '../store'
import UserProfile from '../components/UserProfile.vue'
import Modal from '../components/Modal.vue'
import createMessage from '@/hooks/createMessage'
export default defineComponent({
  components: {
    UserProfile,
    Modal
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const router = useRouter()
    const modalIsVisible = ref(false)
    const currentId = route.params.id
    const md = new MarkdownIt()
    onMounted(() => {
      store.dispatch('fetchPost', currentId)
      console.log(currentPost.value)
    })
    const currentPost = computed<PostProps>(() => store.getters.getCurrentPost(currentId))
    // eslint-disable-next-line vue/return-in-computed-property
    const currentHtml = computed(() => {
      if (currentPost.value && currentPost.value.content) {
        return md.render(currentPost.value.content)
        // return currentPost.value.content
      }
    })

    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps
        return postAuthor._id === _id
      } else {
        return false
      }
    })

    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value
        return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
      } else {
        return null
      }
    })
    const handleDeletePost = () => {
      modalIsVisible.value = false
      store.dispatch('deletePost', currentId).then((rawData: ResponseType<PostProps>) => {
        // router.push({ name: 'home' })
        createMessage('删除成功', 'success', 2000)
        router.push({ name: 'column', params: { id: store.state.user.column } })
        // router.push({ name: 'column', params: { id: 1 } })
      })
    }
    return {
      currentPost,
      currentImageUrl,
      currentHtml,
      showEditArea,
      modalIsVisible,
      handleDeletePost
    }
  }
})
</script>
