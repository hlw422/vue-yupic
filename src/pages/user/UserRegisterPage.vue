<template>
    <div id="user-login-page">
        <h2 class="title">云图库-用户注册</h2>
        <div class="desc">企业级智能协同云图库系统</div>
        <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish">
            <a-form-item name="userAccount" :rules="[{ required: true, message: '请输入账号' }]">
                <a-input v-model:value="formState.userAccount" placeholder="请输入账号" />
            </a-form-item>

            <a-form-item name="userPassword" :rules="[{ required: true, message: '请输入密码' }]">
                <a-input-password v-model:value="formState.userPassword" placeholder="请输入密码" />
            </a-form-item>
            <a-form-item name="checkPassword" :rules="[{ required: true, message: '请输入确认密码' }]">
                <a-input-password v-model:value="formState.checkPassword" placeholder="请输入确认密码" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit" style="width: 100%">注册</a-button>
            </a-form-item>
            <div class="tips">
                已有账号？
                <router-link to="/user/login">立即登陆</router-link>
            </div>
        </a-form>
    </div>
</template>
<script lang="ts" setup>
import { userLoginUsingPost, userRegisterUsingPost } from '@/api/userController';
import { reactive } from 'vue';
import { useCounterStore } from '@/stores/useLoginUserStore.ts';
import { message } from 'ant-design-vue';
import router from '@/router';

const loginUserStore = useCounterStore();

const formState = reactive<API.UserRegisterRequest>({
    userAccount: '',
    userPassword: '',
    checkPassword: ''
});
const onFinish = async (values: any) => {
    try {
        if (formState.userPassword !== formState.checkPassword) {
            message.error('两次密码输入不一致，请重新输入');
            return;
        }
        const res = await userRegisterUsingPost(values);
        if (res.data.code == 0 && res.data.data) {
            message.success('注册成功');
            // 跳转到主页
            router.push({
                path: '/user/login',
                replace: true // 强制替换当前路由
            });
        }
        else {
            message.error('注册失败，请检查账号密码');
        }
    }
    catch (e) {
        message.error('注册失败，请检查网络');
        console.log(e);
    }

};
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
</script>

<style scoped>
#user-login-page {
    max-width: 360px;
    /*
       居中
    */
    margin: 0 auto;
}

.title {
    text-align: center;
    margin-bottom: 16px;
}

.desc {
    text-align: center;
    color: #bbb;
    margin-bottom: 16px;
}

.tips {
    color: #bbb;
    text-align: right;
    font-size: 13px;
}
</style>