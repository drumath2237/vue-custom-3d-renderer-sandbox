// oxlint-disable no-unused-vars

import { defineComponent, h, RendererOptions } from '@vue/runtime-core'

const elementsNames = [
  'Scene',
  'RotatedCamera',
  'DirectionalLight',
  'Box',
  'StandardMaterial',
  'Sphere',
] as const

type Nodes = any
type ElementsNames = (typeof elementsNames)[number]

type Elements = any

type D = Record<ElementsNames, any>

type DD = D['DirectionalLight']

const ops: RendererOptions<Nodes, Elements> = {
  createComment(text) {
    return null
  },
  createElement(type, _namespace, _isCustomizedBuiltin, props) {
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

  patchProp(el: ElementsNames, key: string, prevValue: any, nextValue: any) {},

  remove(el) {},
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

export const Scene = createElementComponent<{}>('Scene')
