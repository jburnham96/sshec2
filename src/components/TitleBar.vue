<template>
    <div class="titlebar">
        <div class="drag-region">
            <div id="window-controls">
            </div>
        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.titlebar {
  display: block;
  position: fixed;
  height: 32px;
  width: calc(100% - 2px); /*Compensate for body 1px border*/
  background: #222222;

  padding: 4px;
}

.drag-region {
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
}
</style>