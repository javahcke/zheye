<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader action="/upload" class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4 file-upload-container" :beforeUpload="uploadCheck" @file-uploaded="handleFileUploaded">
      <h2>点击上传图片</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only"></span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #success="uploadedData">
        <img :src="uploadedData.uploadedData.data.url" />
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input type="text" placeholder="请输入文章标题" v-model="titleVal" :rules="titleRules" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input type="text" :tag="'textarea'" rows="10" placeholder="请输入文章详情" v-model="contentVal" :rules="contentRules"/>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">提交</button>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useStore } from 'vuex'
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '@/store'
import router from '@/router'
import Uploader from '@/components/Uploader.vue'
import { beforeUploadCheck } from '@/helper'
import createMessage from '@/hooks/createMessage'
export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput,
    Uploader
  },
  setup () {
    let imageId = ''
    const titleVal = ref('')
    const titleRules: RulesProp = [
      { type: 'required', message: '标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '内容不能为空' }
    ]
    const state = useStore<GlobalDataProps>()
    const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }
    const onFormSubmit = (result: any) => {
      if (result) {
        const { column, _id } = state.state.user
        if (column) {
          const newPost: PostProps = {
            _id: String(new Date().getTime()),
            title: titleVal.value,
            content: contentVal.value,
            column: String(column),
            createdAt: new Date().toLocaleString(),
            author: _id
          }
          if (imageId) {
            newPost.image = imageId
          }
          state.dispatch('createPost', newPost).then(() => {
            createMessage('创建成功', 'success', 2000)
            setTimeout(() => {
              router.push({ name: 'column', params: { id: column } })
            })
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
      handleFileUploaded
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
  height: 100%;
  object-fit: cover;
}
</style>
