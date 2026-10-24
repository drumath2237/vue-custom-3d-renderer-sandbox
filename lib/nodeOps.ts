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
  type SceneVueContext,
  type BoxProps,
  type SphereProps,
  type DirectionalLightProps,
  type MaterialProps,
} from './elements'

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
        case 'DirectionalLight':
          return new DirectionalLightObject({
            direction: props?.direction,
            intensity: props?.intensity,
          })
        case 'Box':
          return new BoxObject(context.engine, {
            position: props?.position,
            size: props?.size,
          })
        case 'Sphere':
          return new SphereObject(context.engine, {
            diameter: props?.diameter,
            position: props?.position,
          })
        case 'Material':
          return new MaterialObject({ color: props?.color })
        case 'Root':
          return new Null()
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

export const Box = createElementComponent<Partial<BoxProps>>('Box')
export const Sphere = createElementComponent<Partial<SphereProps>>('Sphere')
export const DirectionalLight =
  createElementComponent<Partial<DirectionalLightProps>>('DirectionalLight')
export const Material = createElementComponent<Partial<MaterialProps>>('Material')
