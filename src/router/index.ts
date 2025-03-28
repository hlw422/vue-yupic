import { createRouter, createWebHistory } from 'vue-router'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'
import UserManagerPage from '@/pages/admin/UserManagerPage.vue'
import HomePage from '@/pages/HomePage.vue'
import AddPicturePage from '@/pages/picture/AddPicturePage.vue'
import PictureManagerPage from '@/pages/picture/PictureManagerPage.vue'
import PictureDetailPage from '@/pages/picture/PictureDetailPage.vue'
import CardPage from '@/pages/css/cardPage.vue'
import AddPictureBatchPage from '@/pages/picture/AddPictureBatchPage.vue'
import FlexDesign from '@/pages/css/flexDesign.vue'
import CssMove from '@/pages/css/cssMove.vue'
import Grid from '@/pages/css/grid.vue'
import FileUpload from '@/pages/css/fileUpload.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      component: HomePage,
    },
    {
      path: '/user/login',
      name: '用户登录',
      component: UserLoginPage,
    },
    {
      path: '/user/register',
      name: '用户注册',
      component: UserRegisterPage,
    },
    {
      path: '/admin/userManage',
      name: '用户管理',
      component: UserManagerPage,
    },
    {
      path: '/add_picture',
      name: '创建图片',
      component: AddPicturePage,
    },
    {
      path: '/admin/pictureManage',
      name: '图片管理',
      component: PictureManagerPage,
    },
    {
      path: '/picture/:id',
      name: '图片详情',
      component: PictureDetailPage,
      props: true
    },
    {
      path: '/css_demo',
      name: 'Css 样式',
      component: CardPage,
    },
    {
      path: '/flex_demo',
      name: 'Flex 样式',
      component: FlexDesign,
    },
    {
      path: '/css_move',
      name: 'css 动画',
      component: CssMove,
    },
    {
      path: '/add_picture/batch',
      name: '批量创建图片',
      component: AddPictureBatchPage,
    },
    {
      path: '/grid',
      name: 'grid 布局',
      component: Grid,
    },
    {
      path: '/fileupload',
      name: '文件上传',
      component: FileUpload,
    },
  ],
  
})

export default router
