<template>
  <div class="container" id="app">
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: 'test1的专栏描述',
    avatar: 'https://www.gszhjr.com.cn/fastdfs/group1/M00/01/83/rKgBEmS2R8OAIS_xAAAUBA_zEtQ365.png'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: 'test2的专栏描述',
    avatar: 'https://www.gszhjr.com.cn/fastdfs/group1/M00/00/5C/rKgBEmLwwsqAWg0QAAAMNeDMYvo143.png'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: 'test3的专栏描述'
    // avatar: 'https://www.gszhjr.com.cn/fastdfs/group1/M00/01/83/rKgBEmS2R8OAIS_xAAAUBA_zEtQ365.png'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: 'test4的专栏描述',
    avatar: 'https://www.gszhjr.com.cn/fastdfs/group1/M00/00/5C/rKgBEmLwwsqAWg0QAAAMNeDMYvo143.png'
  }
]

export default defineComponent({
  name: 'App',
  components: {
    ColumnList
  },
  setup () {
    return {
      list: testData
    }
  }
})
</script>

<style>
</style>
