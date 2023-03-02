export default {
    state:{
        // 用控制菜单的展开与收起
        isCollapse:false
    },
    mutations:{
        // 修改菜单的展开与收起
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        }
    }
}