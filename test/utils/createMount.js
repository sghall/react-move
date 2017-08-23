// @flow weak

import { mount as enzymeMount } from 'enzyme';

export default function createMount(mount = enzymeMount) {
  const attachTo = window.document.createElement('svg');
  window.document.body.insertBefore(attachTo, window.document.body.firstChild);

  const mountWithSVG = function mountWithSVG(node) {
    return mount(node, { attachTo });
  };

  mountWithSVG.attachTo = attachTo;

  mountWithSVG.cleanUp = () => {
    attachTo.parentNode.removeChild(attachTo);
  };

  return mountWithSVG;
}
