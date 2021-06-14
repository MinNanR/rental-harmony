
export default {
    data: {
        title: 'World',
        loginForm:{
            name: "",
            password:"",
        }
    },
    onNameChange(e){
        console.info("name--" + e.value)
        this.loginForm.name = e.value
    },
    onPasswordChange(e){
        console.info("password---" + e.value)
        this.loginForm.password = e.value
    },
    login(){
        console.info(JSON.stringify(this.loginForm))
    }
}
