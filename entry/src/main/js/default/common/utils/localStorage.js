import storage from '@system.storage';

const localstorage = {
/**
     * 设置缓存，没有过期时间
     */
    setStorage(key, value) {
        let obj = {
            data: value,
            expire: -1
        }
        storage.set({
            key: key,
            value: JSON.stringify(obj),
            success() {
                console.info("success set storage data,key = " + key)
            },
            fail(data, code) {
                console.warn("fail to set storage data,code : " + code + ", data : " + data)
            }
        })
    },

/**
     * 设置缓存并设置过期时间（单位：ms）
     */
    setStorageExpire(key, value, duration) {
        let current = new Date()
        let obj = {
            data: value,
            expire: current.getTime() + duration
        }
        storage.set({
            key: key,
            value: JSON.stringify(obj),
            success() {
                console.info("success set storage data,key = " + key)
            },
            fail(data, code) {
                console.warn("fail to set storage data,code : " + code + ", data : " + data)
            }
        })
    },
/**
     * 获得指定键
     */
    async getStorage(key){
        let value = ''
        await storage.get({
            key: key,
            success(data) {
                console.info("get storage ==== " + data)
                let obj = JSON.parse(data)
                let expire = obj.expire
                let current = new Date()
                if (expire === -1) {
                    value = obj.data
                } else if (current.getTime() > expire) {
                    storage.delete({
                        key: key,
                        success() {
                            console.info("success to delete storage key : " + key)
                        }
                    })
                    value = null
                } else {
                    value = obj.data
                }
            }
        })
        console.info("value====" + value)
        return value
    },
/**
     * 删除指定键
     * @param key
     * @return
     */
    removeStorage(key) {
        storage.delete({
            key: key
        })
    }
}

export default localstorage