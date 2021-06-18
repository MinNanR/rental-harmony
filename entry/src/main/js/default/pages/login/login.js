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
    async login() {
        let passsw
        this.buildAction(this.loginForm.password)
        console.info(JSON.stringify(this.loginForm))
    },
    buildAction(password){
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
