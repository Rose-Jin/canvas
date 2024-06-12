<template>
<div>
    <canvas ref="canvas" width="1600" height="1200">6666666</canvas>
</div>
</template>
<script setup>
import { ref,onMounted,onUnmounted,reactive,defineEmits } from "vue"
const canvas=ref(null)
const cellWidth = 100 * 2
const cellHeight = 50 * 2
const selectedCell=reactive({row:1, column:1})
const data={
  columns:[{title: '姓名', key:'name',width:200},{
    title:'年龄',key:"age",width:200
  }],
  // dataSource:[
  //   {key:1,name:'张三',age:18},
  //   {key:2,name:'李四',age:18},
  //   {key:3,name:'王武',age:18}
  // ]
  dataSource:Array.from({length:1000}).map((item,index)=>{
    return{
      key:index,
      name: `name-${index}`,
      age:Math.floor(Math.random()*100)}
  })
}
defineEmits('click')
const handleClick=(ev)=>{
    // 当前点击了哪里
    
    const { left, top } = canvas.value.getBoundingClientRect()
  const x = ev.clientX - left
  const y = ev.clientY - top
    const rowIndex = Math.floor((y * 2) / cellHeight) - 1
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
  for (let i = 0; i < dataSource.length; i++) {
    ctx.beginPath()
    const record = dataSource[i]
    for (let j = 0; j < columns.length; j++) {
       //如果被选中了，就需要画举行来高亮单元格
       const column = columns[j]
      ctx.font = `${16 * pixelRatio}px serif`
      ctx.fillStyle=randomColor()
      // 画矩形是fill填充操作
      if(selectedCell.row===i && selectedCell.column === j){
        ctx.fillRect(j * cellWidth,(i + 1) * cellHeight,cellWidth,cellHeight) 
      }
      ctx.fillStyle='black'
      ctx.fillText(record[column.key], j * cellWidth + padding, (i + 1) * cellHeight + cellHeight / 2)

      
      ctx.closePath()
    }
  }

ctx.closePath()
}
onMounted(()=>{
  drawTable()
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