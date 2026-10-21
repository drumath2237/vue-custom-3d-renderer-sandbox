export const elementsNames = [
  'Scene',
  'RotatedCamera',
  'DirectionalLight',
  'Box',
  'StandardMaterial',
  'Sphere',
] as const

export type ElementsNames = (typeof elementsNames)[number]

export type V3DObject<T> = {
  name: ElementsNames
  object: T
}

export function createElements<T>(name: ElementsNames, objectFactory: () => T): V3DObject<T> {
  return {
    name,
    object: objectFactory(),
  }
}

export const V3DObjects = [] satisfies Array<V3DObject<any>>
