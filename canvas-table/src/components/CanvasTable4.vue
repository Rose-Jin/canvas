<template>
<div>
  <input type="text" @input="handleSearch">
    <canvas ref="canvas" width="1600" height="1200">6666666</canvas>
</div>
</template>
<script setup>
import { ref,onMounted,onUnmounted,reactive,defineEmits,watch } from "vue"
const canvas=ref(null)
const cellWidth = 100 * 2
const cellHeight = 50 * 2
const selectedCell=reactive({row:1, column:1})
const d={
  columns:[{title: '姓名', key:'name',width:200},{
    title:'年龄',key:"age",width:200
  }],
  
  dataSource:Array.from({length:1000}).map((item,index)=>{
    return{
      key:index,
      name: `name-${index}`,
      age:Math.floor(Math.random()*100)}
  }),
  
}
const data = reactive({
  ...d,
  tempalteDataSource:d.dataSource
})
//当前可视区域第一行的index是多少, 默认是0
let startRow=10 
const visibleRows=Math.ceil(1200/100)-1
defineEmits('click')

const handleSearch=(ev)=>{
  const {value}=ev.target
  data.dataSource=data?.tempalteDataSource.filter(item=>item.name.includes(value))
  // 数组变动太大会导致组件重新渲染， canvastable更新了也没关系
  
}
watch(()=>data.dataSource,()=>{
  drawTable()
})
const handleWheel=()=>{
  // wheel鼠标滚动事件
  document.addEventListener('wheel',(ev)=>{
    console.log(ev,ev.deltaX,ev.deltaY)
    const {deltaY }=ev
    if(deltaY < 0){
      startRow=Math.max(0,data.dataSource.length)
    }else{
      startRow=Math.min(data.dataSource.length,startRow+1)
    }
    drawTable()
  })
}
const handleClick=(ev)=>{
    // 当前点击了哪里
    
    const { left, top } = canvas.value.getBoundingClientRect()
  const x = ev.clientX - left
  const y = ev.clientY - top
    const rowIndex = Math.floor((y * 2) / cellHeight) - 1+startRow
  const colIndex = Math.floor((x * 2) / cellWidth)
  console.log('🚀 ~ file: CanvasTable3.vue:47 ~ handleClick ~ colIndex:', rowIndex, colIndex)
    // console.log(55,rowIndex,colIndex)
    //被选中
    if(rowIndex >=0 &&rowIndex<data.dataSource.length){
      selectedCell.row=rowIndex
      selectedCell.column=colIndex

    }
    // this.$emit('click')
    drawTable()
}

const randomColor=()=>{
  const randomNum=Math.random()
  if(randomNum>0 && randomNum<0.3){
    return 'red'
  }else if(randomNum>0.3 && randomNum<0.6){
    return 'blue'
  }else{
    return 'yellow'
  }

}
//table66
const drawTable=()=>{
  canvas.value.addEventListener('click',handleClick)
const pixelRatio=window.devicePixelRatio
const {columns, dataSource}=data

const ctx=canvas.value.getContext('2d')
ctx.clearRect(0,0,1600,1200)
const padding=10

ctx.font=`${pixelRatio * 16}px bold serif`//da
ctx.beginPath()

// 画表头
for (let i = 0; i < columns.length; i++) {
    const column = columns[i]
    ctx.font = `bold ${16 * pixelRatio}px serif`
    ctx.fillText(column.title, i * cellWidth + padding, cellHeight / 2)
    console.log('🚀 ~ file: CanvasTable2.vue:49 ~ onMounted ~ column:', column)
  }

  // 表格
  for (let i = startRow; i < startRow + visibleRows; i++) {
    ctx.beginPath()
    const record = dataSource[i]
    for (let j = 0; j < columns.length; j++) {
       //如果被选中了，就需要画举行来高亮单元格
       const column = columns[j]
      ctx.font = `${16 * pixelRatio}px serif`
      ctx.fillStyle=randomColor()
      // 画矩形是fill填充操作
      if(selectedCell.row===i && selectedCell.column === j){
        ctx.fillRect(j * cellWidth,(i - startRow + 1) * cellHeight,cellWidth,cellHeight) 
      }
      ctx.fillStyle='black'
      ctx.fillText(record[column.key], j * cellWidth + padding, (i - startRow+ 1) * cellHeight + cellHeight / 2)

      
      ctx.closePath()
    }
  }

ctx.closePath()
}
onMounted(()=>{
  drawTable()
  handleWheel()
})
console.log(window.devicePixelRatio)//2倍
onUnmounted(()=>{
    canvas.value?.removeEventListener('click',handleClick)
})
</script>
<style>
canvas{
width: 800px;
height: 600px;
background-color: rgb(241, 215, 219);
}
</style>