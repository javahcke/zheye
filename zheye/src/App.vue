<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
    <div class="container">
      <global-header :user="currentUser"></global-header>
      <!-- <column-list :list="list"></column-list> -->
      <Validate-form @form-submit="onFormSubmit">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
          <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text" ref="inputRef"></validate-input>
          <div>{{ emailVal }}</div>
          <div class="form-text" v-if="emailRef.error">{{emailRef.message}}</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">密码</label>
          <validate-input :rules="passwordRules" v-model="passwordlVal" placeholder="请输入密码" type="password"></validate-input>
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
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1',
    description: 'description1',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2',
    description: 'description2',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3',
    description: 'description3'
  },
  {
    id: 4,
    title: 'test4',
    description: 'description4',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]
const currentUser: UserProps = {
  isLogin: true,
  name: 'test'
}
export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  inheritAttrs: false,
  setup () {
    const emailRules: RulesProp = [
      { type: 'required', message: '邮箱地址不能为空' },
      { type: 'email', message: '邮箱格式不正确' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'can not be empty'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = 'email format is incorrect'
      } else {
        emailRef.error = false
      }
    }
    const emailVal = ref('')
    const passwordlVal = ref(' ')
    const inputRef = ref<any>(null)
    const onFormSubmit = (result: boolean) => {
      console.log('form submit', result)
      // console.log('emailRef', inputRef.value.validateInput())
    }
    return {
      list: testData,
      currentUser,
      emailRef,
      validateEmail,
      emailRules,
      emailVal,
      passwordRules,
      passwordlVal,
      onFormSubmit,
      inputRef
    }
  }
})
</script>

<style>

</style>
