// oxlint-disable no-unused-vars

import { defineComponent, h, type RendererOptions } from '@vue/runtime-core'
import {
  type ElementsNames,
  Box,
  Sphere,
  DirectionalLight,
  Material,
  type SceneVueObject,
  isElementName,
  Null,
} from './elements'

type SceneVueElements = SceneVueObject<any>
type SceneVueNodes = SceneVueElements

export const nodeOps: RendererOptions<SceneVueNodes, SceneVueElements> = {
  createElement(type, _namespace, _isCustomizedBuiltin, props) {
    if (!isElementName(type)) {
      return new Null()
    }

    return new Null()
  },
  insert(el, parent) {},
  parentNode(node) {
    return null
  },

  patchProp(el, key: string, prevValue: any, nextValue: any) {},
  remove(el) {},
  nextSibling(node) {
    return null
  },

  createText(text) {
    return new Null()
  },
  createComment(text) {
    return new Null()
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
