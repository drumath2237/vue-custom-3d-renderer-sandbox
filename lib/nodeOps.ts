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
  RootObject,
  type SceneVueContext,
} from './elements'
import { vec3 } from '@babylonjs/lite'

type SceneVueElements = SceneVueObject<any>
type SceneVueNodes = SceneVueElements

export function nodeOps(
  context: SceneVueContext,
): RendererOptions<SceneVueNodes, SceneVueElements> {
  return {
    createElement(type, _namespace, _isCustomizedBuiltin, props) {
      if (!isElementName(type)) {
        return new Null()
      }

      console.log('create: ', type, props)

      switch (type) {
        case 'Root':
          return new RootObject(context)
        case 'DirectionalLight':
          return new DirectionalLight({ direction: vec3(0, 0, 0), intensity: 1 })
        case 'Boxx':
          return new Box(context.engine, { scale: vec3(0.1, 0.1, 0.1) })
        case 'Sphere':
          return new Sphere(context.engine, { diameter: 0.1 })
        case 'Material':
          return new Material()
        case 'Null':
          return new Null()
      }
    },

    insert(el, parent) {
      console.log('insert: ', el, parent)

      if (el instanceof Box || el instanceof Sphere) {
        if (parent instanceof Box || parent instanceof Sphere) {
          parent.addToChildren(el)
        }

        el.addToScene(context.scene)
      } else if (el instanceof Material) {
        if (parent instanceof Box || parent instanceof Sphere) {
          parent.setMaterial(el.internalMaterial)
        }
      } else if (el instanceof DirectionalLight) {
        el.addToScene(context.scene)
      }
    },

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
