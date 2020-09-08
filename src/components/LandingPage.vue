<template>
  <div>
    <div id="wrapper">
      <div class="tabs-list">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          :class="`tab ${tab.active ? 'is-active' : ''}`"
        >
          <a :href="tab.href" class="tab-text" @click="selectTab(tab)">{{
            tab.name
          }}</a>
        </div>
      </div>
      <div v-for="tab in tabs" :key="tab.id + 'tabcontent'" v-show="tab.active" class="tab-container">
        <div v-if="tab.type === 'search'" class="tab-content">
          <search v-on:list-item-clicked="itemClicked" />
        </div>
        <div v-if="tab.type === 'terminal'">
          <terminal
            v-on:terminal-end="terminalEnded()"
            :startCommand="`ssh ${tab.ipAddress}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from "./Search.vue";
import terminal from "./Terminal.vue";
const { v4: uuidv4 } = require('uuid');

export default {
  name: "landing-page",
  data: () => ({
    tabs: [
      { id: uuidv4(), name: "Search", type: 'search', active: true },
      // { id: 1, name: "Terminal session", type: 'terminal', ipAddress: '' },
    ],
  }),
  components: {
    search,
    terminal,
  },
  methods: {
    itemClicked(ipAddress) {
      this.disableAllTabs();
  
      this.tabs.push({
        id: uuidv4(),
        name: ipAddress,
        type: 'terminal',
        ipAddress,
        active: true,
      })
    },
    terminalEnded() {
      this.terminalView = false;
    },
    selectTab(tab) {
      this.disableAllTabs();
      tab.active = true;
    },
    disableAllTabs() {
      this.tabs.forEach((tab, index, arr) => {
        arr[index].active = false;
      });
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}

.tab-container {
  min-height: 70vh;
  min-width: 90vw;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.tab-content {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

.tabs-list {
  margin-top: 49px;
  align-self: flex-start;
  margin-left: 130px;

  display: flex;
  flex-direction: row;
}

.tab {
  color: rgb(77, 77, 77);
  margin-left: 10px;
}

.tab:hover {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #929292;
  color: #929292;
  cursor: pointer;
}

.tab.is-active {
  color: white;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-image: linear-gradient(to right, #11998e, #38ef7d);
  border-image-slice: 1;
}

.tab-text {
  font-size: 18px;
}
</style>
