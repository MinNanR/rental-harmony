import request from '../../common/utils/request.js'
import router from '@system.router';
import localstorage from '../../common/utils/localStorage.js'
import prompt from '@system.prompt';

const ABILITY_TYPE_EXTERNAL = 0;
const ABILITY_TYPE_INTERNAL = 1;
const ACTION_SYNC = 0;
const ACTION_ASYNC = 1;

export default {
    data: {
        title: 'World',
        loginForm: {
            username: "",
            password: "",
        },
        modalVisibility: 'hidden'
    },
    onNameChange(e) {
        console.info("name--" + e.value)
        this.loginForm.username = e.value
    },
    onPasswordChange(e) {
        console.info("password---" + e.value)
        this.loginForm.password = e.value
    },
    login() {
        if (this.loginForm.username === '') {
            prompt.showToast({
                message: "用户名不能为空",
                duration: 3000,
                bottom: 2000
            })
            return
        }
        if (this.loginForm.password === '') {
            prompt.showToast({
                message: "密码不能为空",
                duration: 3000,
                bottom: 2000
            })
            return
        }
        let action = this.buildAction(this.loginForm.password)
        let form = {
            username: this.loginForm.username
        }
        FeatureAbility.callAbility(action)
            .then(res => {
            let response = JSON.parse(res)
            if (response.code === "000") {
                let encodedPassword = response.encodedPassword
                form.password = encodedPassword;
//                setTimeout(() => this.submitLogin(form), 3000)
                this.submitLogin(form)
            } else {
                Promise.reject(response.message);
            }
        })

    },
    submitLogin(form) {
        this.modalVisibility = "visible"
        request
        .post("/auth/login/password", form)
            .then(response => {
            let {data, message} = response
            localstorage.setStorageExpire("token", `Bearer ${data.token}`, 7 * 24 * 60 * 60 * 1000)
            localstorage.setStorage("username", form.username)
            this.modalVisibility = "hidden"
            router.push({
                uri: "pages/index/index"
            })
        })
            .catch(err => {
            this.modalVisibility = "hidden"
            prompt.showDialog({
                title: "登录失败",
                message: err,
                buttons: [{text: "确认",color:"#666666"}]
            })
            console.error(err)
        })
    },
    buildAction(password) {
        return {
            bundleName: "site.minnan.rental",
            abilityName: "site.minnan.rental.SecurityAbility",
            messageCode: 1001,
            data: {
                password: password
            },
            abilityType: ABILITY_TYPE_EXTERNAL,
        }
    },
    async onShow(){
        let token = await localstorage.getStorage("token")
        console.info(`token on login page === ${token}`)
    }
}
