<template>
  <button class="button">
    <div class="button_hover" />
    <div class="button_content">
      <slot />
    </div>
  </button>
</template>

<script>
export default {
  name: "ToastButton"
};
</script>

<style>
.button {
  padding: 12px 16px;
  display: inline-block;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all 0.2s ease;
  border-radius: 8px;
  appearance: none;
  position: relative;
  outline: none;
  font-size: 14px;
  height: 40px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
}

.button.success {
  background-color: #28a745;
  color: #fff;
}

.button.info {
  background-color: #17a2b8;
  color: #fff;
}

.button.warning {
  background-color: #ffc107;
  color: #fff;
}

.button.error {
  background-color: #dc3545;
  color: #fff;
}

.button.default {
  background-color: #343a40;
  color: #fff;
}

.button-sprawled {
  min-width: 160px;
  padding: 12px 48px;
}
.button_hover {
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgba(115, 115, 115, 0.2);
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.1s all ease;
}
.button:hover > .button_hover {
  opacity: 1;
}
.button_content {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
}
</style>
