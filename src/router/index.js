import Vue from "vue";
import Router from "vue-router";
import store from '../store';
const electron = require("electron");
const {app} = electron.remote;
const fs = electron.remote.require("fs");

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: require("@/components/LandingPage").default,
      meta: { requiresCredentials: true },
    },
    {
      path: "/settings",
      name: "settings",
      component: require("@/components/Settings").default,
    },
    {
      path: "/no-credentials",
      name: "no-credentials",
      component: require("@/components/NoCredentials").default,
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const credFilePath = `${app.getPath("home")}\\.aws\\credentials`
  const credsFound = fs.existsSync(credFilePath);

  store.dispatch('setCredentialsFound', credsFound);

  if (
    to.matched.some((record) => record.meta.requiresCredentials) &&
    !credsFound
  ) {
    next("/no-credentials");
  } else {
    next();
  }
});

export default router;
