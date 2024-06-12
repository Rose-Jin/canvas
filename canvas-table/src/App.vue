<script setup>
// import CanvasTable4 from "./components/CanvasTable4.vue";
import DndDemo1 from "./components/DndDemo1.vue";


const data={
  columns:[{title: '姓名', key:'name',width:200},{
    title:'年龄',key:"age",width:200
  }],
  // dataSource:[
  //   {key:1,name:'张三',age:18},
  //   {key:2,name:'李四',age:18},
  //   {key:3,name:'王武',age:18}
  // ]
  dataSource:Array.from({length:10}).map((item,index)=>{
    return{
      key:index,
      name: `name-${index}`,
      age:Math.floor(Math.random()*100)}
  })
}
/////

 
setTimeout( () => {
  console.log('1')
  Promise.resole().then( () => {
    console.log('2')
  })
},0)

new Promise((resolve, reject) => {
    console.log('3')
    resolve()
})
.then(res => {
    console.log('4');
})

console.log('5')











</script>

<template>
 <!-- <div>{{ data }}</div> -->
 <div>
  <!-- <table>
    <thead>
    <tr><th v-for="(item,index) in data.columns" :key="index">{{ item.title }}</th></tr>
  </thead>
  <tbody>
    <tr v-for="(record,index) in data.dataSource" :key="index">
    <td v-for="(column,index) in data.columns" :key="index">{{ record[column.key] }}</td></tr>
  </tbody>
</table> -->
  <DndDemo1>
    
  </DndDemo1>
  
 </div>
</template>

<style scoped>
table{
  border-collapse: collapse;
}
td {
  width: 100px;
  border: 1px solid #ccc
}
</style>
