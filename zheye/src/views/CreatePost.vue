<template>
  <div class="create-post-page">
    <h4>{{isEditMode ? '编辑文章' : '新建文章'}}</h4>
    <uploader action="/upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4 file-upload-container"
      :beforeUpload="uploadCheck" :uploaded="uploaedData" @file-uploaded="handleFileUploaded">
      <h2>点击上传图片</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only"></span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData.data ? dataProps.uploadedData.data.url : ''" />
          <h3>点击重新上传</h3>
        </div>
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input type="text" placeholder="请输入文章标题" v-model="titleVal" :rules="titleRules" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input type="text" :tag="'textarea'" rows="10" placeholder="请输入文章详情" v-model="contentVal"
          :rules="contentRules" />
      </div>
      <template #submit>
        <div class="d-flex align-items-center justify-content-center my-4">
          <button class="btn btn-primary btn-large">{{isEditMode ? '更新文章' : '发布文章'}}</button>
        </div>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useStore } from 'vuex'
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '@/store'
import router from '@/router'
import Uploader from '@/components/Uploader.vue'
import { beforeUploadCheck } from '@/helper'
import createMessage from '@/hooks/createMessage'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput,
    Uploader
  },
  setup () {
    const uploaedData = ref({})
    let imageId = ''
    const titleVal = ref('')
    const route = useRoute()
    const isEditMode = !!route.query.id
    const titleRules: RulesProp = [
      { type: 'required', message: '标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '内容不能为空' }
    ]
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      if (isEditMode) {
        store.dispatch('fetchPost', route.query.id).then((rawData: ResponseType<PostProps>) => {
          console.log(rawData)
          const currentPost = rawData.data
          titleVal.value = currentPost.title
          contentVal.value = currentPost.content || ''
          if (currentPost.image) {
            uploaedData.value = {
              data: currentPost.image
            }
          } else {
            uploaedData.value = { data: null }
          }
        })
      }
    })
    const state = useStore<GlobalDataProps>()
    const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }
    const onFormSubmit = (result: any) => {
      if (result) {
        const { column, _id } = state.state.user
        console.log(state.state.user)
        if (_id) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column: String('5f3e86d62c56ee13bb83096c'),
            author: '6796356734c77f95ad2fcd7e'
          }
          if (imageId) {
            newPost.image = imageId
          }
          const actionName = isEditMode ? 'updatePost' : 'createPost'
          const sendData = isEditMode ? { id: route.query.id, payload: newPost } : newPost
          console.log(sendData)
          state.dispatch(actionName, sendData).then((res) => {
            createMessage('创建成功', 'success', 2000)
            setTimeout(() => {
              router.push({ path: `/posts/${res.data._id}/` })
            })
          }).catch(error => {
            createMessage(error.error || '创建失败', 'error', 2000)
          })
          // state.commit('createPost', newPost)
          // router.push({ name: 'column', params: { id: column } })
        }
      }
    }
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('文件格式不正确', 'error', 2000)
      }
      if (error === 'size') {
        createMessage('文件大小不能超过1M', 'error', 2000)
      }
      return passed
    }
    return {
      onFormSubmit,
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      uploadCheck,
      handleFileUploaded,
      uploaedData,
      isEditMode
    }
  }
})
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}

.create-post-page .file-upload-container img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.uploaded-area {
  position: relative;
}

.uploaded-area:hover h3 {
  display: block;
}

.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
