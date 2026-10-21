// oxlint-disable no-unused-vars

import { defineComponent, h, type RendererOptions } from '@vue/runtime-core'
import {
  type ElementsNames,
  BoxObject,
  SphereObject,
  DirectionalLightObject,
  MaterialObject,
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
          return new DirectionalLightObject({ direction: vec3(1, -1, 1), intensity: 1 })
        case 'Boxx':
          return new BoxObject(context.engine)
        case 'Sphere':
          return new SphereObject(context.engine)
        case 'Material':
          return new MaterialObject()
        case 'Null':
          return new Null()
      }
    },

    insert(el, parent) {
      if (el instanceof Null) {
        return
      }

      console.log('insert: ', el)

      if (el instanceof BoxObject || el instanceof SphereObject) {
        if (parent instanceof BoxObject || parent instanceof SphereObject) {
          parent.addToChildren(el)
        }
        el.addToScene(context.scene)
      } else if (el instanceof MaterialObject) {
        if (parent instanceof BoxObject || parent instanceof SphereObject) {
          parent.setMaterial(el.internalMaterial)
        }
      } else if (el instanceof DirectionalLightObject) {
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

export const Boxx = createElementComponent('Boxx')
export const Sphere = createElementComponent('Sphere')
export const DirectionalLight = createElementComponent('DirectionalLight')
export const Material = createElementComponent('Material')
