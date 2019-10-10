import Vue from 'vue'
import Router from 'vue-router'

import login from '@/views/login'
import index from '@/views/index'
import postList from '@/views/postList'
import postAdd from '@/views/postAdd'
import postEdit from '@/views/postEdit'

Vue.use(Router)

export default new Router({
  // 可忽略，默认的声明, 主要是带#号和不带#号的区别，没有好坏之分
  mode: 'history',
  // 可忽略
  base: process.env.BASE_URL,
  // 路由的配置
  routes: [{
      path: "/login",
      component: login
    },
    {
      path: "/",
      component: index,
      meta: "首页",
      children: [{
          path: "post_list",
          component: postList,
          meta: "文章列表"
        },
        {
          path: "post_add",
          component: postAdd,
          meta: "发布文章"
        },
        {
          path: "post_edit/:id",
          component: postEdit,
          meta: "编辑文章"
        }        
      ]
    },
  ]
})
