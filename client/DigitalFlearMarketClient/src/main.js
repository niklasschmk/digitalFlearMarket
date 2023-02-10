import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import axios from 'axios'
import VueAxios from 'vue-axios'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//import font awesome icons
import { faStar, faUserPlus } from '@fortawesome/free-solid-svg-icons'

//adding imported icons to the library
library.add(faStar, faUserPlus)



const app = createApp(App)
createApp(App)

app.config.globalProperties = {
    apiurl  : 'http://localhost:8080/'

}

app.use(router)
app.use(VueAxios, axios)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
