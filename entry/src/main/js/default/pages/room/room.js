import tabBar from "../../common/config/tabBar.js"
import router from '@system.router';
import request from '../../common/utils/request.js'

export default {
    data: {
        title: 'room',
        houseList: [],
        isRefreshing: false,
        loading: false,
    //        refreshHeight: "0px",
        time: ""
    },
    onInit() {
        const tabBarList = tabBar.tabBar;
        tabBarList[1].selected = true;
        this.$set("tabBar", tabBarList);
    },
    navigateTo(selected, url) {
        if (!selected) {
            router.push({
                uri: url
            });
        }
    },
    onShow() {
        this.getHouseList()
    },
    getHouseList() {
        request.post("/house/getHouseDropDown", {})
            .then(response => {
            let {data} = response
            setTimeout(() => {
                this.isRefreshing = false
                this.houseList = data
            }, 200)
        })
            .catch(err => {
            console.error(err)
        })
    },

    onRefresh(e) {
        /**
         * 下拉框刷新的过程：
         * 1.触发pulldown事件，state='start'，在这里要修改组件的刷新状态为true
         * 2.当组件的刷新状态修改后会触发refresh事件，refreshing=true，在这里判断是否正在请求数据(loading标记量）如果为false则修改loading标记量为true并请求数据
         * 3.在请求方法回调内修改组件刷新状态为false，然后会触发refresh事件，refreshing=false,
         * 4.触发pulldown事件，state='end'
         */
        if (!this.loading) {
            this.loading = true
            this.getHouseList()
        }
    },
    onPullDown(e) {
        let state = e.state
        if (state === 'start') {
            this.isRefreshing = true
        } else if (state === 'end') {
            this.loading = false
        }
    }
}
