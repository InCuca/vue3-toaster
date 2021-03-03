<template>
  <div class="hello">
    <spacing bottom="4">
      <h1>{{ msg }}</h1>
      <p>Click a button to show a Toast</p>
    </spacing>
    <div class="grid">
      <toast-button class="default" @click="toast">Default</toast-button>
      <toast-button class="success" @click="toast('success')">
        Success
      </toast-button>
      <toast-button class="info" @click="toast('info')">Info</toast-button>
      <toast-button class="warning" @click="toast('warning')">
        Warning
      </toast-button>
      <toast-button class="error" @click="toast('error')">Error</toast-button>
    </div>
    <spacing :vertical="4">
      <h2>Do your changes</h2>
      <spacing :vertical="2">
        <div class="two-columns">
          <div>
            <fieldset>
              <label class="label" for="message">Message</label>
              <input id="message" v-model="message" type="text" />
            </fieldset>
            <fieldset>
              <label class="label">Position</label>
              <label
                v-for="position in POSITIONS"
                :key="position.key"
                class="label"
              >
                <input
                  name="position"
                  type="radio"
                  :value="position.value"
                  v-model="options.position"
                  @change="toast"
                />{{ position.name }}
              </label>
            </fieldset>
            <fieldset>
              <label class="label">
                Duration: {{ options.duration
                }}{{ options.duration ? "ms" : "" }}
              </label>
              <input
                type="range"
                min="1000"
                max="10000"
                v-model="options.duration"
                :disabled="options.duration === false"
              />
              <label class="label">
                <input type="checkbox" @change="changeDuration" />
                Disable duration
              </label>
            </fieldset>
            <fieldset>
              <label class="label">
                <input
                  type="checkbox"
                  checked
                  @change="options.dismissible = $event.target.checked"
                />
                Dismissible on click
              </label>
            </fieldset>
            <fieldset>
              <label class="label">
                <input
                  type="checkbox"
                  @change="options.queue = $event.target.checked"
                />
                Enqueue
              </label>
            </fieldset>
            <fieldset>
              <label class="label"> Max Toasts</label>
              <input
                type="number"
                v-model="options.maxToasts"
                placeholder="false"
              />
            </fieldset>
            <fieldset>
              <label class="label">
                <input
                  type="checkbox"
                  checked
                  @change="options.pauseOnHover = $event.target.checked"
                />
                Pause on hover
              </label>
            </fieldset>
            <fieldset>
              <label class="label">
                <input
                  type="checkbox"
                  checked
                  @change="options.useDefaultCss = $event.target.checked"
                />
                Use default CSS
              </label>
            </fieldset>
          </div>
          <div class="column-right">
            <div class="code">
              <code>this.$toast(</code>
              <spacing left="2">
                <code class="code-string">"{{ message }}"</code>
                <code v-if="hasOptions">,</code>
              </spacing>
              <spacing v-if="hasOptions" left="2">
                <code>{</code>
                <spacing left="4">
                  <span class="code-object-line" v-if="options.type">
                    <code>type:</code>
                    <code class="code-string">{{ options.type }}</code>
                  </span>
                  <span class="code-object-line" v-if="options.position">
                    <code>position:</code>
                    <code class="code-string">"{{ options.position }}"</code>
                  </span>
                  <span
                    class="code-object-line"
                    v-if="options.duration !== 4000"
                  >
                    <code>duration:</code>
                    <code class="code-number">{{ options.duration }}</code>
                  </span>

                  <span
                    class="code-object-line"
                    v-if="options.dismissible === false"
                  >
                    <code>dismissible:</code>
                    <code class="code-number">{{ options.dismissible }}</code>
                  </span>

                  <span class="code-object-line" v-if="options.queue">
                    <code>queue:</code>
                    <code class="code-number">{{ options.queue }}</code>
                  </span>

                  <span
                    class="code-object-line"
                    v-if="options.maxToasts || options.maxToasts === 0"
                  >
                    <code>max:</code>
                    <code class="code-number">{{ options.maxToasts }}</code>
                  </span>

                  <span
                    class="code-object-line"
                    v-if="options.pauseOnHover === false"
                  >
                    <code>pauseOnHover:</code>
                    <code class="code-number">{{ options.pauseOnHover }}</code>
                  </span>

                  <span
                    class="code-object-line"
                    v-if="options.useDefaultCss === false"
                  >
                    <code>useDefaultCss:</code>
                    <code class="code-number">{{ options.useDefaultCss }}</code>
                  </span>
                </spacing>
                <code>}</code>
              </spacing>
              <code>)</code>
            </div>
            <toast-button @click="toast" class="default">Show it</toast-button>
          </div>
        </div>
      </spacing>
    </spacing>
  </div>
</template>

<script>
import Spacing from "./Spacing.vue";
import ToastButton from "./ToastButton";
import { POSITIONS } from "@incuca/vue3-toaster";

export default {
  name: "HelloWorld",
  data() {
    return {
      message: `Hi! I'm a Toast`,
      options: {
        duration: 4000
      }
    };
  },
  components: {
    ToastButton,
    Spacing
  },
  props: {
    msg: String
  },
  computed: {
    POSITIONS() {
      return Object.keys(POSITIONS).map(key => {
        return {
          key,
          value: POSITIONS[key],
          name: POSITIONS[key].replace(/-/, " ")
        };
      });
    },
    hasOptions() {
      return (
        this.options &&
        (Object.keys(this.options).length > 1 || this.options.duration !== 4000)
      );
    }
  },
  methods: {
    toast(type = "default", dismissible = true) {
      const options = {
        dismissible,
        onClick: this.onClick
      };
      typeof type === "string" && (options.type = type);

      typeof this.options.maxToasts === "string" &&
        (this.options.maxToasts = parseInt(this.options.maxToasts));

      this.$toast.show(this.message, {
        ...options,
        ...this.options
      });
    },
    changeDuration(e) {
      this.options.duration = !e.target.checked ? 4000 : false;
    },
    onClick(e) {
      console.log(e);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

input {
  border: 1px solid transparent;
  height: 40px;
  padding: 10px 16px;
  outline: none;
  border-radius: 8px;
  background-color: #f3f3f4;
  width: 100%;
}

input[type="range"] {
  padding: 0;
}
input[type="radio"],
input[type="checkbox"] {
  height: 22px;
  width: 22px;
  margin-right: 8px;
  cursor: pointer;
}

.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
  max-width: 840px;
  margin: 0 auto;
}

fieldset {
  text-align: left;
  border: none;
  padding: 0;
}

fieldset:not(:last-child) {
  margin-bottom: 20px;
}

.label {
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
}

.code {
  background-color: #252526;
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  padding: 16px;
  text-align: left;
}

.code-string {
  color: #ce9178;
}

.code-object-line {
  display: flex;
}
.code-object-line:not(:last-child)::after {
  content: ",";
  font-family: monospace;
  display: inline-block;
}
.code-object-line > code:last-child {
  margin-left: 8px;
}

.code-number {
  color: #b5cea8;
}

.column-right {
  display: grid;
  grid-gap: 16px;
}
</style>
