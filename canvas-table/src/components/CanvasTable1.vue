<template>
<div>
    <canvas ref="canvas" width="1600" height="1200">6666666</canvas>
</div>
</template>
<script setup>
import { ref,onMounted } from "vue"
const canvas=ref(null)
onMounted(()=>{
const ctx=canvas.value.getContext('2d')
ctx.beginPath()
ctx.moveTo(0,0)
ctx.lineTo(200,200)//直线
ctx.strokeStyle='red'
ctx.font="48px serif"//设置字体
ctx.fillText('hello',100,200)//设置文字
ctx.stroke()
ctx.closePath()
})
console.log(window.devicePixelRatio)//2倍

</script>
<style>
canvas{
width: 800;
height: 600;
background-color: rgb(241, 215, 219);
}
</style>