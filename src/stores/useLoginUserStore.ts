import { getLoginUserUsingGet } from "@/api/userController"
import { defineStore } from "pinia"
import { ref } from "vue"


export const useLoginUserStore = defineStore('loginUser',
    () => {

        const loginUser = ref<API.LoginUserVO>(
            {
                userName: 'not login'
            }
        )
        async function fetchLoginUser() {
            const res = await getLoginUserUsingGet();
            if (res.data.code == 0 && res.data.data) {
                loginUser.value = res.data.data;
            }
        }
        function setLoginUser(user: API.LoginUserVO) {
            loginUser.value = user;
        }
        return { loginUser, fetchLoginUser, setLoginUser }
    }, {
    persist: true  // This will enable localStorage persistence
})

