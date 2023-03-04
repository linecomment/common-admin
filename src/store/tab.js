export default {
    state:{
        // 用控制菜单的展开与收起
        isCollapse:false,
        // 面包屑数据
        tabList:[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ]
    },
    mutations:{
        // 修改菜单的展开与收起
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        selectMenu(state,val){
            // 判断当前是否为首页
            if(val.name !== 'home'){
                const index = state.tabList.findIndex(item => item.name === val.name)
                if(index === -1){
                    state.tabList.push(val)
                }
            }
        },
        // 删除指定的tag数据
        closeTag(state,val){
            const index = state.tabList.findIndex(item => item.name === val.name)
            // 删除一个索引为 index 的元素
            state.tabList.splice(index,1)
        }
    }
}