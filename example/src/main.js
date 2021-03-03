import { createApp } from "vue";
import App from "./App.vue";

import Toaster from "@incuca/vue3-toaster";

createApp(App)
  .use(Toaster)
  .mount("#app");
