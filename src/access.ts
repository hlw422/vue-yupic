import { message } from "ant-design-vue";
import router from "./router";
import { useLoginUserStore } from "@/stores/useLoginUserStore.ts";


let firstFetchLoginUser = true;
router.beforeEach(async (to, from, next) => {

    const loginUserStore = useLoginUserStore();
    let loginUser = loginUserStore.loginUser;
    if (firstFetchLoginUser) {
        await loginUserStore.fetchLoginUser();
        loginUser = loginUserStore.loginUser;
        firstFetchLoginUser = false;
    }
    const url = to.fullPath;
    if (url.startsWith('/admin') && loginUser.userRole != 'admin') {
        message.error('没有权限访问该页面');
        next(`/user/login?redirect=${to.fullPath}`);
    } else {
        next();
    }
});