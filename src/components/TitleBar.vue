<template>
  <div class="titlebar">
    <div class="drag-region">
      <div id="window-controls">
        <div class="button" id="min-button">
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

        <div class="button" id="max-button">
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

        <div class="button" id="restore-button">
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

        <div class="button" id="close-button">
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
export default {};
</script>

<style scoped>
.titlebar {
  display: block;
  position: fixed;
  height: 32px;
  width: calc(100% - 2px); /*Compensate for body 1px border*/
  background: #303030;
  /*background: #222222;*/
  color: #FFF;
  padding: 4px;
}

.drag-region {
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
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
</style>
