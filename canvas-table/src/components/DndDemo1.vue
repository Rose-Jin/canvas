<template><div>
  <div class="content">
    <div class="material-panel" ref="materialContainer">
      <div class="material-card" v-for="material in materials" :key="material.type">
        {{ material.title }}
      </div>
    </div>
    <div class="layout" ref="layoutContainer">
      <div class="layout-item" v-for="(d, i) in data" :key="i">{{ d.content }}</div>
    </div>
  </div>
</div>
<DndContainer><div>123</div></DndContainer>
</template>
<script setup>
import {ref,onMounted,toRaw} from 'vue'
import {smoothDnD,dropHandlers} from 'smooth-dnd'
import { DndContainer } from './DndContainer'
smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler

const materials = [
  { title: '图片', type: 'image' },
  { title: '文本', type: 'text' },
  { title: '按钮', type: 'button' },
  { title: '输入框', type: 'input' },
  { title: '下拉框', type: 'select' },
  { title: '单选框', type: 'radio' }
]
const data = ref([
  {
    id: 1,
    type: 'image',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    content:
      'https://img.alicdn.com/imgextra/i4/O1CN01QYQ4QI1qZQYQYQ4QI_!!6000000001382-2-tps-200-200.png'
  },
  {
    id: 2,
    type: 'text',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    content: '文本'
  },
  {
    id: 3,
    type: 'button',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    content: '按钮'
  },
  {
    id: 4,
    type: 'input',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    content: '输入框'
  },
  {
    id: 5,
    type: 'select',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    content: '下拉框'
  },
  {
    id: 6,
    type: 'radio',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    content: '单选框'
  }
])
const materialContainer = ref(null)
const layoutContainer = ref(null)
onMounted(() => {
  // 物料区
  smoothDnD(materialContainer.value, {
    groupName: 'material',
    behaviour: 'copy',
    getChildPayload(index) {
      return {
        id: data.value.length + 1,
        type: materials[index].type,
        title: materials[index].title,
        content: materials[index].title,
        x: 0,
        y: 0,
        width: 100,
        height: 100
      }
    }
  })
  // 编排区
  smoothDnD(layoutContainer.value, {
    groupName: 'material',
    onDrop(dropResult) {
      const result = applyDrag(toRaw(data.value), dropResult)
      data.value = result
      // 问题怎么引起， DOMException: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.
      // dom 复用引起
      console.log('🚀 ~ file: DndDemo1.vue:140 ~ onDrop ~ result:', result)
    }
  })
})
const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult

  const result = [...arr]

  // 没做操作
  if (addedIndex === null) return result

  // 添加
  if (addedIndex !== null && removedIndex === null) {
    result.splice(addedIndex, 0, {
      id: `${Math.random()}`,
      ...payload
    })
  }

  // 移动
  if (addedIndex !== null && removedIndex !== null) {
    return arrayMove(result, removedIndex, addedIndex)
  }

  return result
}
function arrayMove(array, from, to) {
  const newArray = array.slice()
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0])

  return newArray
}
</script>
<style scoped>
.content {
  display: flex;
}

.material-panel {
  width: 200px;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
}

.material-card {
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  user-select: none;
}
.layout-item {
  width: 100%;
  height: 100px;
  background-color: #002222;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  user-select: none;
  /* border: 1px solid transparent; */

  &:hover {
    /* border-color: #ccc; */
    box-shadow: inset 0 0 1px 1px #ccc;
  }
}
</style>