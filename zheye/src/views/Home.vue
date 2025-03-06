<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/createPost" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <!-- <uploader action="/upload" :beforeUpload="beforeUpload" @file-uploaded="onFileUploaded">
      <h2>点击上传</h2>
      <template #loading>
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </template>
      <template #success="dataProps">
        <img :src="dataProps.uploadedData.data.url" :alt="dataProps.uploadedData.data.fileName" width="200">
      </template>
    </uploader> -->
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
    >
      加载更多
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ResponseType, ImageProps } from '../store'
import ColumnList from '../components/ColumnList.vue'
// import Uploader from '@/components/Uploader.vue'
import createMessage from '@/hooks/createMessage'

export default defineComponent({
  components: {
    ColumnList
    // Uploader
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.state.columns)
    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        createMessage('上传图片只能是 JPG 格式!', 'error', 2000)
      }
      return isJPG
    }
    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传成功 ${rawData.data._id}`, 'success', 2000)
    }
    return {
      list,
      beforeUpload,
      onFileUploaded
    }
  }
})
</script>
