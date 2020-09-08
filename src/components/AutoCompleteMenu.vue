<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div class="list-container">
      <div v-for="item of items" :key="item.id">
        <listItem
          :type="item.type"
          :name="item.name"
          :clusterName="item.clusterName"
          :ipAddress="item.targetIp"
          :search="search"
          v-on:list-item-clicked="itemClicked"
        />
      </div>
    </div>
</template>

<script>
import listItem from './ListItem.vue';

export default {
  components: {
    listItem,
  },
  props: ['items', 'search'],
  methods: {
    itemClicked(selectedItem) {
      this.$emit('list-item-clicked', selectedItem);
    },
  },
};
</script>

<style lang="scss">
  .list-container {
      background-color: #171717;
      color: #736e6e;
      position: absolute;
      width: 100%;

      /*temp*/
      overflow: auto;
      max-height: 230px;
  }

  .list-container::-webkit-scrollbar-track
  {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
      background-color: #232323;
  }

  .list-container::-webkit-scrollbar
  {
      width: 7px;
      background-color: #232323;
  }

  .list-container::-webkit-scrollbar-thumb
  {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: rgb(17, 17, 17)
  }

  hr {
      border-color: #5a5959;
  }
</style>