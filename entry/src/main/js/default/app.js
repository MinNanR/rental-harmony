import router from '@system.router';

export default {
    onCreate() {
        console.info('AceApplication onCreate');
        router.push({uri:"pages/login/login"})
    },
    onDestroy() {
        console.info('AceApplication onDestroy');
    }
};
