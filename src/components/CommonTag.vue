<template>
  <div class="tabs">
    <el-tag 
    v-for="(item,index) in tags" 
    :key="item.path" 
    :closable="item.name !== 'home' " 
    :effect="$route.name === item.name ? 'dark' : 'pain'" 
    @click="changeTag(item)"
    @close="hangdleClose(item,index)"
    size="samll"
    >
    {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
    name:'CommonTag',
    data(){
        return {}
    },
    methods:{
        ...mapMutations(['closeTag']),
        changeTag(item){
            this.$router.push(item.path)
        },
        hangdleClose(item,index){
            // 调用 mutation 中的 closeTag
            this.closeTag(item)
            const length = this.tags.length
            // 删除 tag 跳转
            if(item.name !== this.$route.name){
                // 删除非当前页面标签
                return
            }
            if(index === length){
                // 删除最右一个，往左边跳
                this.$router.push({
                    name:this.tags[index-1].name
                })
            }else{
                // 删除中间一个，往右边跳
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabList
        })
    }
}
</script>

<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-right: 20px;
        cursor: pointer;
    }
}
</style>