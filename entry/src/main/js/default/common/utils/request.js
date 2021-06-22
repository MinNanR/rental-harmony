import fetch from '@system.fetch';
import localstorage from "./localStorage.js"
import prompt from '@system.prompt';
import router from '@system.router';

const baseUrl = "https://minnan.site:2002/rental"

const request = {
    post: async function (url, param) {
        let header = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
//        let token = await localstorage.getStorage("token")
        let token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyZWFsTmFtZSI6IuawkemaviIsInN1YiI6Im1pbiIsInN0YW1wIjoiZGE3NWE4ZTUyY2UwNGNjZWIzMTdhODVkMTVkNjUyZGIiLCJpZCI6MSwiZXhwIjoxNjI0ODczOTQxLCJpYXQiOjE2MjQyNjkxNDF9.UCONq_pbWs84xrdOLUIdAQN3v2jg5PDFc5A3ExDfdFmIQrBRm9D12WBBspSfD_9l9ItscaDVQx0shFf0pqfHcQ'
        if (token != null) {
            header.Authorization = token
        }
        return new Promise((resolve, reject) => {
            fetch.fetch({
                url: `${baseUrl}${url}`,
                header: header,
                data: param,
                method: "POST",
                responseType: "json",
                success: (response) => {
                    if (response.code === 200) {
                        //headers为字符串，存在null:["HTTP/1.1 200 "]，导致无法进行JSON解析，这里先删除这个请求头
                        let headersString = response.headers.replace("null:[\"HTTP/1.1 200 \"]", "\"null\":[\"HTTP/1.1 200 \"]")
                        let headers = JSON.parse(headersString)
                        if (headers.newToken != null) {
                            localstorage.setStorageExpire("token", `Bearer ${headers.newToken}`, 7 * 24 * 60 * 60 * 1000)
                        }
                        let data = JSON.parse(response.data)
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
                fail(err) {
                    if(err != null || err != undefined){
                        console.error(`request error : ${JSON.stringify(err)}`)
                    }else{
                        console.error("request error")
                    }
                    return reject(err)
                },
                complete() {
                    console.info(`request ${baseUrl}${url} complete`)
                }
            })
        })
    }
}

export default request