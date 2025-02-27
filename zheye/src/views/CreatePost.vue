<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
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
import { GlobalDataProps, PostProps } from '@/store'
import router from '@/router'
export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const titleVal = ref('')
    const titleRules: RulesProp = [
      { type: 'required', message: '标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '内容不能为空' }
    ]
    const state = useStore<GlobalDataProps>()
    const onFormSubmit = (result: any) => {
      if (result) {
        const { columnId } = state.state.user
        const newPost: PostProps = {
          id: new Date().getTime(),
          title: titleVal.value,
          content: contentVal.value,
          columnId,
          createdAt: new Date().toLocaleString()
        }
        console.log(newPost)
        state.commit('createPost', newPost)
        router.push({ name: 'column', params: { id: columnId } })
      }
    }
    return {
      onFormSubmit,
      titleVal,
      titleRules,
      contentVal,
      contentRules
    }
  }
})
</script>
