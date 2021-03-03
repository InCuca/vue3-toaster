# Vue3 Toaster

> Lightweight toast-notification plugin for Vue 3

## Installation

```bash
npm install @incuca/vue3-toaster
```

## Usage

Import in your main.js

```js
import Toaster from "@incuca/vue3-toaster";

createApp(App)
  .use(Toaster)
  .mount("#app");
```

Usage in your components with Options API

```js
this.$toast.show(message, { ...options });
this.$toast.success(`Hey! I'm here`);
this.$toast.error(`Hey! I'm here`);
this.$toast.warning(`Hey! I'm here`);
this.$toast.info(`Hey! I'm here`);
// Close all opened toasts after 3000ms
setTimeout(this.$toast.clear, 3000);
```

Usage with Composition API

```js
import { inject } from "vue";
const toast = inject("toast");
toast.show(message, { ...options });
```

## Available options

The API methods accepts these options:

| Attribute     |      Type      |    Default     | Description                                                              |
| :------------ | :------------: | :------------: | :----------------------------------------------------------------------- |
| message       |     String     |       --       | Message text/html (required)                                             |
| type          |     String     |   `default`    | `success`, `info`, `warning`, `error` or `default`                       |
| position      |     String     | `bottom-right` | `top`, `bottom`, `top-right`, `bottom-right`,`top-left` or `bottom-left` |
| duration      | Number/Boolean |     `4000`     | Visibility duration in milliseconds or `false` that disables duration    |
| dismissible   |    Boolean     |     `true`     | Allow user close by clicking                                             |
| onClick       |    Function    |       --       | Do something when user clicks                                            |
| onClose       |    Function    |       --       | Do something after toast gets dismissed                                  |
| queue         |    Boolean     |    `false`     | Wait for existing to close before showing new                            |
| maxToasts     | Number/Boolean |    `false`     | Defines the max of toasts showed in simultaneous                         |
| pauseOnHover  |    Boolean     |     `true`     | Pause the timer when mouse hover a toast                                 |
| useDefaultCss |    Boolean     |     `true`     | Use default css styles                                                   |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
