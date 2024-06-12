import { defineComponent,h } from "vue";
import {smoothDnD,dropHandlers} from 'smooth-dnd'//6.导入dmoothDnd
smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler
export const DndContainer=defineComponent({
name:'DndContainer',//1. 组件名称
//4setup初始化方法
setup(){
return {dndContainer: null}
},

//2. 接受那些props
props:{
},
//5. mounted
mounted(){
    const containerElement=this.$refs.container || this.$el
    this.container=smoothDnD(containerElement,{groupName: 'material'})
},
render(){//3. 渲染页面
    return h('div',{ref: 'container',class: 'dnd-container',style: {
        color: 'pink',
        fontSize: '20px'
      }},this.$slots.default?.())
}

})