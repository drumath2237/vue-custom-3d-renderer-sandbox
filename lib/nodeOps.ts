// oxlint-disable no-unused-vars

import { defineComponent, h, RendererOptions } from '@vue/runtime-core'
import { ElementsNames } from './elements'

type V3DNodes = any
type V3DElements = any

const ops: RendererOptions<V3DNodes, V3DElements> = {
  createElement(type, _namespace, _isCustomizedBuiltin, props) {
    return null
  },
  insert(el, parent) {},
  parentNode(node) {
    return null
  },

  patchProp(el: ElementsNames, key: string, prevValue: any, nextValue: any) {},
  remove(el) {},

  nextSibling(node) {
    return null
  },
  createText(text) {
    return null
  },
  createComment(text) {
    return null
  },
  setElementText(node, text) {},
  setText(node, text) {},
}

function createElementComponent<T = {}>(tag: ElementsNames) {
  return defineComponent<T>({
    name: tag,
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
      return () => {
        return h(tag, { ...attrs, ...props }, slots.default?.() ?? [])
      }
    },
  })
}

export const Scene = createElementComponent('Scene')
