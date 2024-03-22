
import { createApp } from "vue";
import Small from './Small.vue'
import { createPinia } from "./small";

const app = createApp(Small)
app.use(createPinia())

app.mount('#app')




/*
import { createApp } from "vue";
import { createPinia } from "./pinia/src";
// import { myCreatePinia } from "./mini-pinia/source/index";
import App from "./App.vue";
// import App from "./mini-pinia/mini-App.vue";

const app = createApp(App);

app.use(createPinia());
// app.use(myCreatePinia());

app.mount("#app");
*/
