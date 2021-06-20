import fetch from '@system.fetch';
import localstorage from "./localStorage.js"
import prompt from '@system.prompt';
import router from '@system.router';


const request = {
    post: async function (url, param) {
        let header = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        let token = await localstorage.getStorage("token")
        if (token != null) {
            header.Authorization = token
        }
        return new Promise((resolve, reject) => {
            fetch.fetch({
                url: url,
                header: header,
                data: param,
                method: "POST",
                responseType: "json",
                success: (response) => {
                    if (response.code === 200) {
                        if (response.headers.newToken != null) {
                            localstorage.setStorageExpire(token, `Bearer ${response.headers.newToken}`, 7 * 24 * 60 * 60 * 1000)
                        }
                        let data = response.data
                        if (data.code === '000') {
                            resolve(data)
                        } else {
                            return reject(data.message)
                        }
                    } else if (response.code === 401) {
                        localstorage.removeStorage("token")
                        prompt.showDialog({
                            title: "身份校验失败",
                            message: response.data.message || '登陆信息缺失',
                            buttons: [
                                {
                                    text: "确认",
                                    color: "#000000"
                                }
                            ],
                            success: (res) => {
                                router.replace({
                                    url: "/pages/login/login"
                                })
                            }
                        })
                    } else {
                        return reject(response)
                    }
                },
                fail: () => {
                    return reject()
                }
            })
        })
    }
}

export default request