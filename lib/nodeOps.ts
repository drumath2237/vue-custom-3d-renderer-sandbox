// oxlint-disable no-unused-vars

import { RendererOptions } from '@vue/runtime-core'

const ops: RendererOptions<any, any> = {
  createComment(text) {
    return null
  },
  createElement(type) {
    return null
  },
  createText(text) {
    return null
  },
  insert(el, parent) {},
  nextSibling(node) {
    return null
  },
  parentNode(node) {
    return null
  },
  patchProp(el, key, prevValue, nextValue) {},
  remove(el) {},
  setElementText(node, text) {},
  setText(node, text) {},
}
