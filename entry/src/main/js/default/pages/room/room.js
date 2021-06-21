import tabBar from "../../common/config/tabBar.js"
import router from '@system.router';
import request from '../../common/utils/request.js'

export default {
    data: {
        title: 'room',
        houseList: [],
        showLoading: "hidden",
        isRefreshing:false,
//        refreshHeight: "0px",
        time:""
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
        this.showLoading = "visible"
        request.post("/house/getHouseDropDown", {})
            .then(response => {
            let {data} = response
            setTimeout(() => {
                this.showLoading = "hidden"
                this.houseList = data
            }, 200)
        })
            .catch(err => {
            console.error(err)
        })
    },
    onRefresh(){
        let date = new Date();
        this.time = date.toLocaleTimeString()
        this.showLoading = "visible"
        setTimeout(() => {
            this.showLoading = "hidden"
//            this.refreshHeight = "0px";
            console.info(`isRefreshing === ${this.isRefreshing}`)
        }, 3000)
    }
}
