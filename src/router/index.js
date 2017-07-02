import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 组件 - Basic
const layout = resolve => {
    require.ensure(['@/components/layout'], () => {
      resolve(require('@/components/layout'));
    })
}
const Basic = [
    {
        path: '/',
        name: 'layout',
        component: layout
    }
]
// 组件 - Form
/*const form = resolve => {
    require.ensure(['@/components/Hello'], () => {
      resolve(require('@/components/Hello'));
    })
}
const Form = [
    {
        path: '/',
        name: 'basic',
        component: basic
    }
]*/





// 路由挂载
const router = new Router({
  routes: [
    ...Basic
  ]
})

export default router;
