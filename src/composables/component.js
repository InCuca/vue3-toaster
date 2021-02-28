import { render, h } from "vue";

const mount = (component, { props, children, element, app } = {}) => {
  let el = element ? element : document.createElement("div");
  let vNode = h(component, props, children);
  if (app && app._context) vNode.appContext = app._context;

  render(vNode, el);

  const destroy = () => {
    if (el) render(null, el);
    el = null;
    vNode = null;
  };

  return { vNode, destroy, el };
};

const umount = el => {
  if (typeof el.remove !== "undefined") {
    el.remove();
  } else {
    el.parentNode.removeChild(el);
  }
};

export default function useComponent() {
  return { mount, umount };
}
