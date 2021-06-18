import tabBar from "../../common/config/tabBar.js"
import router from '@system.router';

// abilityType: 0-Ability; 1-Internal Ability
const ABILITY_TYPE_EXTERNAL = 0;
const ABILITY_TYPE_INTERNAL = 1;
// syncOption(Optional, default sync): 0-Sync; 1-Async
const ACTION_SYNC = 0;
const ACTION_ASYNC = 1;
const ACTION_MESSAGE_CODE_PLUS = 1001;

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
        //        router.push({uri:"pages/login/login"})
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
        let action = {
            bundleName: "site.minnan.rental",
            abilityName: "site.minnan.rental.SecurityAbility",
            messageCode: 1001,
            data: {
                password: "minnan35"
            },
            abilityType: ABILITY_TYPE_EXTERNAL,
        }
        FeatureAbility.callAbility(action)
        .then(res => {
            console.info(res);
        })
        .catch(err => {
            console.error(err)
        })
        //        router.push({uri:"pages/login/login"})
    }
}