const msToMm = {};

function converMsToMm(ms) {
  const mins = Math.floor(ms / 60000);
  const sec = (((ms % 60000) / 1000).toFixed(0));

  return `${mins}:${sec}`;
}

msToMm.install = function (Vue) {
  Vue.filter('ms-to-mm', (val => converMsToMm(val)));
};

export default msToMm;
