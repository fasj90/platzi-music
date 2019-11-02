const blur = {};
/* eslint-disable no-param-reassign */

function setBlur(el, binding) {
  el.style.filter = !binding.value ? 'blur(3px)' : 'node';
  el.style.cursor = !binding.value ? 'not-allowed' : 'inherit';

  el.querySelectorAll('button').forEach(a => {
    if (!binding.value) {
      a.setAttribute('disable', true);
    } else {
      a.removeAttribute('disable');
    }
  });
}

blur.install = function (Vue) {
  Vue.directive('blur', {
    bind(el, binding) {
      setBlur(el, binding);
    },
  });
};

/* eslint-enable no-param-reassign */
export default blur;
