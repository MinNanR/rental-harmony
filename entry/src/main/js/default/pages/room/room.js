import tabBar from "../../common/config/tabBar.js"
import router from '@system.router';

export default {
    data: {
        title: 'room'
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
    }
}
