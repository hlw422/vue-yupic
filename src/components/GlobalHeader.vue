<template>
  <div id="global-header">
    <a-row :wrap="false">
      <a-col flex="200px">
        <router-link to="/">
          <div class="title-bar">
            <img class="logo" src="@/assets/logo.png" alt="logo">
            <div class="title">Vue iOS</div>
          </div>
        </router-link>
      </a-col>
      <a-col flex="auto">
        <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="handleClick" />
      </a-col>
      <a-col flex="120px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            <a-dropdown>
              <a-space>
                <a-avatar :src="loginUserStore.loginUser.userAvatar" />
                {{ loginUserStore.loginUser.userName ?? '未登录' }}
              </a-space>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="logout">
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div v-else>
            <a-button type="primary" class="login-btn" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>

  </div>
</template>
<script lang="ts" setup>
import { computed, h, ref } from 'vue'
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { MenuProps, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

import { useLoginUserStore } from '@/stores/useLoginUserStore.ts';
import { userLogoutUsingPost } from '@/api/userController';
const loginUserStore = useLoginUserStore();

const router = useRouter()
const current = ref<string[]>(['/'])
const handleClick = ({ key }: { key: string }) => {
  router.push({ path: key })
}
//更新选中菜单
router.afterEach((to, from, next) => {
  current.value = [to.path]
})
const OriginalMenuitems = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/admin/userManage',
    label: '用户管理',
    title: '关于',
  },
  {
    key: '/add_picture',
    label: '创建图片',
    title: '创建图片'
  },
  {
    key: '/admin/pictureManage',
    label: '图片管理',
    title: '图片管理',
  },
  {
    key: 'others',
    label: h('a', { href: 'https://www.codefather.cn', target: '_blank' }, '编程导航'),
    title: '编程导航',
  },
])
// 过滤菜单项
const filterMenus = (menus = [] as MenuProps['items']) => {
  return menus?.filter((menu) => {
    if (menu.key.startsWith('/admin')) {
      const loginUser = loginUserStore.loginUser
      if (!loginUser || loginUser.userRole !== "admin") {
        return false
      }
    }
    return true
  })
}

const items=computed(() => 
  filterMenus(OriginalMenuitems.value));

const logout = async () => {
  const res = await userLogoutUsingPost();
  if (res.data.code === 0) {
    loginUserStore.setLoginUser({
      userName: '未登陆'
    })
    message.success('退出登录成功')
    router.push({ path: '/user/login' })
  } else {
    message.error('退出登录失败')
  }
}
</script>


<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 60px;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}
</style>