import { onUnmounted } from 'vue'

// 定义一个函数，用于创建DOM节点
function useDOMCreate (nodeId: string) {
  // 创建一个div节点
  const node = document.createElement('div')
  // 设置节点的id属性
  node.id = nodeId
  // 将节点添加到body中
  document.body.appendChild(node)
  // 在组件卸载时，将节点从body中移除
  onUnmounted(() => {
    document.body.removeChild(node)
  })
}

export default useDOMCreate
