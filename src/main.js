import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

Vue.use(VueLazyload, {
    loading: require('assets/image/cm2_default_artist_banner@2x.jpg')
})

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper /* { default global options } */ )

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')