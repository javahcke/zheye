<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <Validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text"
          ref="inputRef"></validate-input>
        <div>{{ emailVal }}</div>
        <div class="form-text" v-if="emailRef.error">{{ emailRef.message }}</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">密码</label>
        <validate-input :rules="passwordRules" v-model="passwordlVal" placeholder="请输入密码"
          type="password"></validate-input>
        <div>{{ passwordlVal }}</div>
        <!-- <input type="password" class="form-control" id="exampleInputPassword1"> -->
      </div>
      <template #submit>
        <span class="btn btn-danger">提交</span>
      </template>
    </Validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const router = useRouter()
    const emailRules: RulesProp = [
      { type: 'required', message: '邮箱地址不能为空' },
      { type: 'email', message: '邮箱格式不正确' }
    ]
    const emailVal = ref('')
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const passwordlVal = ref('')

    const store = useStore()
    const onFormSubmit = (result: boolean) => {
      // console.log('form submit', result)
      // router.push({ name: 'column', params: { id: 1 } })
      if (result) {
        router.push('/')
        store.commit('login')
      }
      // console.log('emailRef', inputRef.value.validateInput())
    }
    return {
      onFormSubmit,
      emailRules,
      emailVal,
      emailRef,
      passwordRules,
      passwordlVal
    }
  }
})
</script>

<style></style>
