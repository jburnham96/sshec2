<template>
  <div class="titlebar">
    <div class="drag-region">
      <div id="window-controls">
        <div class="button" id="min-button" v-on:click="win.minimize()">
          <img
            class="icon"
            srcset="
              /icons/min-w-10.png 1x,
              /icons/min-w-12.png 1.25x,
              /icons/min-w-15.png 1.5x,
              /icons/min-w-15.png 1.75x,
              /icons/min-w-20.png 2x,
              /icons/min-w-20.png 2.25x,
              /icons/min-w-24.png 2.5x,
              /icons/min-w-30.png 3x,
              /icons/min-w-30.png 3.5x
            "
            draggable="false"
          />
        </div>

        <div class="button" id="max-button" v-on:click="win.maximize(); toggleMaxRestoreButtons();">
          <img
            class="icon"
            srcset="
              /icons/max-w-10.png 1x,
              /icons/max-w-12.png 1.25x,
              /icons/max-w-15.png 1.5x,
              /icons/max-w-15.png 1.75x,
              /icons/max-w-20.png 2x,
              /icons/max-w-20.png 2.25x,
              /icons/max-w-24.png 2.5x,
              /icons/max-w-30.png 3x,
              /icons/max-w-30.png 3.5x
            "
            draggable="false"
          />
        </div>

        <div class="button" id="restore-button" v-on:click="win.unmaximize(); toggleMaxRestoreButtons();">
          <img
            class="icon"
            srcset="
              /icons/restore-w-10.png 1x,
              /icons/restore-w-12.png 1.25x,
              /icons/restore-w-15.png 1.5x,
              /icons/restore-w-15.png 1.75x,
              /icons/restore-w-20.png 2x,
              /icons/restore-w-20.png 2.25x,
              /icons/restore-w-24.png 2.5x,
              /icons/restore-w-30.png 3x,
              /icons/restore-w-30.png 3.5x
            "
            draggable="false"
          />
        </div>

        <div class="button" id="close-button" v-on:click="win.destroy()">
          <img
            class="icon"
            srcset="
              /icons/close-w-10.png 1x,
              /icons/close-w-12.png 1.25x,
              /icons/close-w-15.png 1.5x,
              /icons/close-w-15.png 1.75x,
              /icons/close-w-20.png 2x,
              /icons/close-w-20.png 2.25x,
              /icons/close-w-24.png 2.5x,
              /icons/close-w-30.png 3x,
              /icons/close-w-30.png 3.5x
            "
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const remote = require('electron').remote;

export default {
  data: () => ({
    win: {},
  }),
  mounted() {
    this.win = remote.getCurrentWindow();
  },
  methods: {
    toggleMaxRestoreButtons() {
        if (this.win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    },
  }
};
</script>

<style scoped>
.titlebar {
  display: block;
  position: fixed;
  height: 32px;
  width: calc(100% - 2px); /*Compensate for body 1px border*/
  color: #FFF;
  padding: 4px;
}

.drag-region {
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
   -webkit-user-select: none;
}

#window-controls {
  display: grid;
  grid-template-columns: repeat(3, 46px);
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}

#window-controls .button {
  grid-row: 1 / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

#min-button {
  grid-column: 1;
}

#max-button, #restore-button {
  grid-column: 2;
}

#close-button {
  grid-column: 3;
}

@media (-webkit-device-pixel-ratio: 1.5), (device-pixel-ratio: 1.5),
(-webkit-device-pixel-ratio: 2), (device-pixel-ratio: 2),
(-webkit-device-pixel-ratio: 3), (device-pixel-ratio: 3) {
  #window-controls .icon {
    width: 10px;
    height: 10px;
  }
}

#window-controls {
  -webkit-app-region: no-drag;
}

#window-controls .button {
  user-select: none;
}

#window-controls .button:hover {
  background: rgba(255,255,255,0.1);
}

#window-controls .button:active {
  background: rgba(255,255,255,0.2);
}

#close-button:hover {
  background: #E81123 !important;
}

#close-button:active {
  background: #F1707A !important;
}

#close-button:active .icon {
  filter: invert(1);
}

#restore-button {
  display: none !important;
}

.maximized #titlebar {
  width: 100%;
  padding: 0;
}

.maximized #window-title {
  margin-left: 12px;
}

.maximized #restore-button {
  display: flex !important;
}

.maximized #max-button {
  display: none;
}
</style>
