const eventBus = {};

eventBus.install = function install(Vue) {
  /* eslint-disable no-param-reassign */
  Vue.prototype.$bus = new Vue();
  /* eslint-enable no-param-reassign */
};


export default eventBus;
