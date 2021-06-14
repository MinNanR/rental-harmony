import tabBar from "../../common/config/tabBar.js"
import router from '@system.router';

export default {
    data: {
        title: "",
        tabBar: []
    },
    onInit() {
        this.title = this.$t('strings.world');
        const tabBarList = tabBar.tabBar;
        tabBarList[0].selected = true;
        this.$set("tabBar", tabBarList);
    },
    onShow() {
        router.push({uri:"pages/login/login"})
    },
    navigateTo(selected, url) {
        console.info(url)
        if (!selected) {
            router.push({
                uri: url
            });
        }
    },
    clickFunc(){
        router.push({uri:"pages/login/login"})
    }
}