// import 导入vue.js  需要提前依赖
import Vue from 'vue'
// import 导入router.js
import VueRouter from 'vue-router'
// 手动导入自己的组件
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import User from '../components/user/user.vue'
import Welcome from '../components/Welcome.vue'
import ItemCat from '../components/items/ItemCat.vue'
import Item from '../components/items/Item.vue'
import AddItem from '../components/items/addItem.vue'

// 在vue对象中声明路由对象 整个脚手架中都可以引用路由
Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/user', component: User },
      { path: '/', component: Welcome },
      { path: '/itemCat', component: ItemCat },
      { path: '/item', component: Item },
      { path: '/item/addItem', component: AddItem }
    ]
  }
]

// 创建路由对象，之后可通过this.$router实现全局路由
const router = new VueRouter({
  routes
})

// 定义路由导航守卫  考点：拦截器  先定义路由对象再进行拦截
/*
    1.遍历的每个路由都会执行回调函数.
    2.参数信息： 3个
      2.1 to：  请求访问的地址      到哪去
      2.2 from：请求从哪里跳转而来  从哪来
      2.3 next：是一个函数，有两种用法，如下：
        2.3.1 next()         请求放行
        2.3.2 next("/login") 拦截请求并发起login请求
*/
router.beforeEach((to, from, next) => {
  // 1.如果用户访问/log的请求，应该直接放行
  if (to.path === '/login') return next()
  // 2.不是访问的登录页面，所以判断用户是否登录， 判断依据token
  // eslint-disable-next-line prefer-const
  let token = window.sessionStorage.getItem('token')
  /*
      if (token) 如果token有值，则执行if之后的操作
      if (!token) 如果token没有值，则执行if之后的操作
  */
  if (!token) return next('/login')

  // 如果代码执行到这一行，说明用户已经登录，则放行
  next()
})

export default router
