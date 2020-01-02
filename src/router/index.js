import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/layout/layout'
import Cookies from "js-cookie"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)


NProgress.configure({
  showSpinner: false, // 是否显示加载ico    
  // easing: 'ease',  // 动画方式    
  // speed: 500,  // 递增进度条的速度    
  // trickleSpeed: 200, // 自动递增间隔    
  // minimum: 0.3 // 初始化时的最小百分比
})

const routes = [
  {
    path: '/changepass',
    name: 'Changepass',
    hidden: true,
    component: () => import('@/views/login/changepass'),
    meta: { title: '更改密码', icon: 'el-icon-folder-delete' }
  },
  {
    path: '/',
    redirect: {
      name: 'Index'
    },
    hidden: true
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/index/index'),
    meta: { title: '首页', icon: 'el-icon-folder-delete', pullpath: '/index' }
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/login'),
    meta: { title: '登录', icon: 'el-icon-folder-delete' }
  },
  {
    path: '/small',
    name: 'Small',
    meta: { title: '小程序管理', icon: 'el-icon-folder-delete' },
    component: layout,
    children: [
      {
        path: 'banner',
        name: 'Banner',
        component: () => import('@/views/index/index'),
        meta: { title: '二级', icon: 'el-icon-folder-delete', pullpath: '/small/banner' }
      },
      {
        path: 'richtext',
        name: 'Richtext',
        component: () => import('@/views/index/index'),
        meta: { title: '二级', icon: 'el-icon-folder-delete', pullpath: '/small/richtext' }
      }
    ]
  },
  {
    path: '/order',
    name: 'Order',
    component: layout,
    meta: { title: '订单', icon: 'el-icon-folder-delete' },
    children: [
      {
        path: 'ordertwo',
        name: 'ordertwo',
        component: layout,
        meta: { title: '二级', icon: 'el-icon-folder-delete' },
        children: [
          {
            path: 'orderthreeone',
            name: 'orderthreeone',
            component: () => import('@/views/index/index'),
            meta: { title: '三级', icon: 'el-icon-folder-delete', pullpath: '/order/ordertwo/orderthreeone' }
          },
          {
            path: 'orderthreetwo',
            name: 'orderthreetwo',
            component: layout,
            meta: { title: '三级', icon: 'el-icon-folder-delete' },
            children: [
              {
                path: 'orderfour',
                name: 'orderfour',
                component: () => import('@/views/index/index'),
                meta: { title: '四级', icon: 'el-icon-folder-delete', pullpath: '/order/ordertwo/orderthreetwo/orderfour' },
              }
            ]
          },
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 全局路由拦截-进入页面前执行
router.beforeEach((to, from, next) => {
  if (Cookies.get('name') && Cookies.get('id')) {
    next();
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login' })
      // router.replace({
      //   path: '/login',
      //   query: {
      //     redirect: router.currentRoute.fullPath
      //   }
      // });
    }
  }
});

//当路由进入后：关闭进度条
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

export default router
