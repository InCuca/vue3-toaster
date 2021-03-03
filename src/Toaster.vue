<template>
  <transition
    :enter-active-class="transition.enter"
    :leave-active-class="transition.leave"
  >
    <div
      v-show="isActive"
      ref="toaster"
      :class="['toast', `toast-${type}`, `toast-${position}`]"
      @mouseover="toggleTimer(true)"
      @mouseleave="toggleTimer(false)"
      @click="click"
      v-html="message"
    />
  </transition>
</template>

<script>
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref
} from "vue";
import Timer from "./composables/timer";
import Event from "./composables/event-bus";
import useComponent from "./composables/component";

export const POSITIONS = Object.freeze({
  TOP_RIGHT: "top-right",
  TOP: "top",
  TOP_LEFT: "top-left",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM: "bottom",
  BOTTOM_LEFT: "bottom-left"
});

export function definePosition(position, top, bottom) {
  let result = null;

  switch (position) {
    case POSITIONS.TOP:
    case POSITIONS.TOP_RIGHT:
    case POSITIONS.TOP_LEFT:
      result = top;
      break;

    case POSITIONS.BOTTOM:
    case POSITIONS.BOTTOM_RIGHT:
    case POSITIONS.BOTTOM_LEFT:
      result = bottom;
      break;
  }

  return result;
}

export default {
  name: "Toaster",

  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "default"
    },
    position: {
      type: String,
      default: POSITIONS.BOTTOM_RIGHT,
      validator(value) {
        return Object.values(POSITIONS).includes(value);
      }
    },
    maxToasts: {
      type: [Number, Boolean],
      default: false
    },
    duration: {
      type: [Number, Boolean],
      default: 4000
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    queue: {
      type: Boolean,
      default: false
    },
    pauseOnHover: {
      type: Boolean,
      default: true
    },
    useDefaultCss: {
      type: Boolean,
      default: true
    },
    onClose: {
      type: Function,
      default: () => {}
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  },

  setup(props) {
    const toaster = ref(null);
    const isActive = ref(false);
    const data = reactive({
      parentTop: null,
      parentBottom: null,
      isHovered: false,
      queueTimer: null,
      timer: null
    });

    function createParents() {
      data.parentTop = document.querySelector(".toast-container-top");
      data.parentBottom = document.querySelector(".toast-container-bottom");

      if (data.parentTop && data.parentBottom) return;

      if (!data.parentTop) {
        data.parentTop = document.createElement("div");
        data.parentTop.className = "toast-container toast-container-top";
      }

      if (!data.parentBottom) {
        data.parentBottom = document.createElement("div");
        data.parentBottom.className = "toast-container toast-container-bottom";
      }
    }

    function setDefaultCss() {
      const type = props.useDefaultCss ? "add" : "remove";
      data.parentTop.classList[type]("default-theme");
      data.parentBottom.classList[type]("default-theme");
    }

    function setupContainer() {
      const container = document.body;
      container.appendChild(data.parentTop);
      container.appendChild(data.parentBottom);
    }

    const correctParent = computed(() =>
      definePosition(props.position, data.parentTop, data.parentBottom)
    );

    function shouldQueue() {
      if (!props.queue && props.maxToasts === false) return false;

      if (props.maxToasts !== false) {
        return (
          props.maxToasts <=
          data.parentTop.childElementCount + data.parentBottom.childElementCount
        );
      }

      return (
        data.parentTop.childElementCount > 0 ||
        data.parentBottom.childElementCount > 0
      );
    }

    function showNotice() {
      if (shouldQueue()) {
        data.queueTimer = setTimeout(showNotice, 250);
        return;
      }

      correctParent.value.insertAdjacentElement("afterbegin", toaster.value);
      isActive.value = true;

      data.timer =
        props.duration !== false ? new Timer(close, props.duration) : null;
    }

    function click() {
      props.onClick.apply(null, arguments);

      if (props.dismissible) {
        close();
      }
    }

    function toggleTimer(newVal) {
      if (data.timer && props.pauseOnHover) {
        newVal ? data.timer.pause() : data.timer.resume();
      }
    }

    function stopTimer() {
      data.timer && data.timer.stop();
      clearTimeout(data.queueTimer);
    }

    function close() {
      stopTimer();
      isActive.value = false;
      setTimeout(() => {
        props.onClose.apply(null, arguments);
        const { umount } = useComponent();
        umount(toaster.value);
      }, 150);
    }

    onBeforeMount(() => {
      createParents();
      setDefaultCss();
      setupContainer();
    });

    onBeforeUnmount(() => {
      Event.$off("clear-toaster", close);
    });

    onMounted(() => {
      showNotice();
      Event.$on("clear-toaster", close);
    });

    const transition = computed(() =>
      definePosition(
        props.position,
        {
          enter: "fadeInDown",
          leave: "fadeOut"
        },
        {
          enter: "fadeInUp",
          leave: "fadeOut"
        }
      )
    );

    return {
      toaster,
      isActive,
      click,
      toggleTimer,
      transition
    };
  }
};
</script>
