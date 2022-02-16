import "./styles.css";
import Event from "./composables/event-bus";
import useComponent from "./composables/component";
import Toaster, { POSITIONS, definePosition } from "./Toaster.vue";

Toaster.install = (app, options = {}) => {
  const globalOptions = options;
  const methods = {
    show(message, options = {}) {
      let localOptions = { message, ...options };
      const { mount } = useComponent();
      const component = mount(Toaster, {
        props: { ...globalOptions, ...localOptions }
      });

      return component;
    },

    clear() {
      Event.$emit("clear-toaster");
    },

    success(message, options = {}) {
      options.type = "success";
      return this.show(message, options);
    },

    error(message, options = {}) {
      options.type = "error";
      return this.show(message, options);
    },

    info(message, options = {}) {
      options.type = "info";
      return this.show(message, options);
    },

    warning(message, options = {}) {
      options.type = "warning";
      return this.show(message, options);
    }
  };

  app.$toast = methods;
  app.config.globalProperties.$toast = methods;
  app.provide("toast", methods);
};

export default Toaster;
export { Toaster, POSITIONS, definePosition };
