<template>
  <div class="header-container">
    <div class="left-content">
        <el-button style="margin-right:20px" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
        <!-- 面包屑 -->
        <!-- <span class="text">首页</span> -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="@/assets/logo.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
    data(){
      return {}
    },
    methods:{
      // 控制菜单的展开与收缩
      handleMenu(){
        this.$store.commit('collapseMenu')
      },
      handleClick(command){
        if(command === 'logout'){
          Cookie.remove('token')
          this.$router.push('/login')
        }
      }
    },
    computed:{
      ...mapState({
        tags:state => state.tab.tabList
      })
    },
    mounted(){
      console.log(this.tags,'tags')
    }
}
</script>

<style lang="less" scoped>
.header-container{
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    .text{
      color: #fff;
      font-size:14px;
      margin-left:10px
    }
    .right-content{
      .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .left-content{
      display:flex;
      align-items: center;
      /deep/.el-breadcrumb__item{
        .el-breadcrumb__inner{
          font-weight: normal;
          &.is-link{
            color:#666
          }
        }
        &:last-child{
          .el-breadcrumb__inner{
            color:#fff
          }
        }
      }
    }
}

</style>