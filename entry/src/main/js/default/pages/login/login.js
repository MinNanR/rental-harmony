import request from '../../common/utils/request.js'

const ABILITY_TYPE_EXTERNAL = 0;
const ABILITY_TYPE_INTERNAL = 1;
const ACTION_SYNC = 0;
const ACTION_ASYNC = 1;

export default {
    data: {
        title: 'World',
        loginForm: {
            name: "",
            password: "",
        }
    },
    onNameChange(e) {
        console.info("name--" + e.value)
        this.loginForm.name = e.value
    },
    onPasswordChange(e) {
        console.info("password---" + e.value)
        this.loginForm.password = e.value
    },
    login() {
        let action = this.buildAction(this.loginForm.password)
        let form = {
            name: this.loginForm.name
        }
        FeatureAbility.callAbility(action)
            .then(res => {
            let response = JSON.parse(res)
            if (response.code === "000") {
                let encodedPassword = response.encodedPassword
                form.password = encodedPassword;
                this.submitLogin(form)
            } else {
                Promise.reject(response.message);
            }
        })
        console.info(JSON.stringify(this.loginForm))
    },
    submitLogin(form) {
        console.info(JSON.stringify(form))
        request.post("https://minnan.site:2002//auth/login/password", form)
            .then(response => {
            let {data, message} = response
            console.info(JSON.stringify(data))
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
    }
}
