<template>
    <div id="app">
        <header style="background: #ccc">
            <img src="./assets/logo.png" style="width: 80px;height: 80px;margin-left: 80px;text-align: left; display:block;">
        </header>
        <div class="main-container">
            <div class="menuBox">
                <nav>
                    <ul>
                        <li v-for="item in menuList">{{item.label}}
                            <ul style="list-style: none;">
                                <li v-for="sitem in item.child" style="padding: 18px 10px;cursor:pointer;" class="menu-child-btn" @click="goToPage(sitem.route)">{{sitem.label}}</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="contentBox">
                  <router-view></router-view>
            </div>
        </div>
        
        
        
    </div>
</template>

<script>
export default {
    name: 'app',
    data(){
        return {
            menuList: [
                {
                    label: 'Basic',
                    child: [
                        {
                            label: 'Layout布局',
                            isActive: false,
                            route: 'xx'
                        },{
                            label: 'Button按钮',
                            isActive: false,
                            route: 'xx'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        goToPage(routePath){
            console.log( routePath );
        }
    }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: flex;
    flex-flow: column;
    & .main-container {
        display: flex;

        & .menuBox{
            width: 10%;
            box-sizing: border-box;
            box-shadow: 0 0 10px #ccc;

            & .menu-child-btn:hover, .menu-child-btn:focus{
                color: #20a0ff;
                opacity: 0.8;
            }
        }

        & .contentBox{
            flex: 1;
            padding-top: 60px;
            margin: 0px 0px 10px 5px;
            box-sizing: content-box;
            box-shadow: 0 0 10px #ccc;
            min-height: 500px;
        }
    }
    
}
.menuBox{

}
nav {
  float: left;
    text-align: left;
}
</style>
