import {
  addToScene,
  createBox,
  createSphere,
  type EngineContext,
  type Mesh,
  type Quat,
  type SceneContext,
  type Vec3,
  type DirectionalLight as DirLight,
  createDirectionalLight,
  type StandardMaterialProps,
  createStandardMaterial,
  type Color3,
  type Material as Material_,
} from '@babylonjs/lite'

export const elementsNames = [
  'DirectionalLight',
  'Boxx',
  'Material',
  'Sphere',
  'Null',
  'Root',
] as const

export type ElementsNames = (typeof elementsNames)[number]

export function isElementName(name: string): name is ElementsNames {
  return elementsNames.includes(name as any)
}

export type SceneVueContext = {
  renderCanvas: HTMLCanvasElement
  engine: EngineContext
  scene: SceneContext
}

export interface SceneVueObject<P> {
  elementName: ElementsNames
  get props(): P
  set props(v: P)
}

export class RootObject implements SceneVueObject<{}> {
  elementName = 'Root' as const

  private _context: SceneVueContext

  get props(): {} {
    return {}
  }

  set props(v: {}) {}

  public constructor(context: SceneVueContext) {
    this._context = context
  }
}

export class Null implements SceneVueObject<{}> {
  get props() {
    return {}
  }
  set props(_v: {}) {}
  elementName = 'Null' as const
}

export type DirectionalLightProps = {
  direction: Vec3
  intensity: number
}

export class DirectionalLightObject implements SceneVueObject<Partial<DirectionalLightProps>> {
  elementName = 'DirectionalLight' as const
  private _props: Partial<DirectionalLightProps>
  private _internalLight: DirLight

  public get props() {
    return this._props
  }

  public set props(v: Partial<DirectionalLightProps>) {
    this._props = v

    const dir = v.direction ?? this._internalLight.direction
    const intensity = v.intensity ?? this._internalLight.intensity

    this._internalLight.direction.copyFrom(dir)
    this._internalLight.intensity = intensity
  }

  public constructor(props: DirectionalLightProps) {
    this._props = props
    const { x, y, z } = props.direction
    this._internalLight = createDirectionalLight([x, y, z], props.intensity)
  }

  public addToScene(scene: SceneContext) {
    addToScene(scene, this._internalLight)
  }
}

type TransformProps = {
  position: Vec3
  rotation: Quat
  scale: Vec3
}

export type BoxProps = {
  size: number
} & TransformProps

export class BoxObject implements SceneVueObject<Partial<BoxProps>> {
  public elementName = 'Boxx' as const
  private _props: Partial<BoxProps>

  private _internalMesh: Mesh
  public get internalMesh() {
    return this._internalMesh
  }

  public get props() {
    return this._props
  }

  public set props(v: Partial<BoxProps>) {
    this._props = v

    const pos = v.position ?? this._internalMesh.position
    const rot = v.rotation ?? this._internalMesh.rotationQuaternion
    const scale = v.scale ?? this._internalMesh.scaling

    this._internalMesh.position.copyFrom(pos)
    this._internalMesh.rotationQuaternion.copyFrom(rot)
    this._internalMesh.scaling.copyFrom(scale)
  }

  public constructor(engine: EngineContext, props?: Partial<BoxProps>) {
    this._props = props ?? { size: 1 }
    this._internalMesh = createBox(engine, { size: this._props.size })
  }

  public addToScene(scene: SceneContext) {
    addToScene(scene, this._internalMesh)
  }

  public setMaterial(material: Material_) {
    this._internalMesh.material = material
  }

  public addToChildren(obj: BoxObject | SphereObject) {
    this._internalMesh.children.push(obj.internalMesh)
  }
}

export type SphereProps = { diameter: number } & TransformProps

export class SphereObject implements SceneVueObject<Partial<SphereProps>> {
  public elementName = 'Sphere' as const
  private _props: Partial<SphereProps>

  private _internalMesh: Mesh
  public get internalMesh() {
    return this._internalMesh
  }

  public get props() {
    return this._props
  }

  public set props(v: Partial<SphereProps>) {
    this._props = v

    const pos = v.position ?? this._internalMesh.position
    const rot = v.rotation ?? this._internalMesh.rotationQuaternion
    const scale = v.scale ?? this._internalMesh.scaling

    this._internalMesh.position.copyFrom(pos)
    this._internalMesh.rotationQuaternion.copyFrom(rot)
    this._internalMesh.scaling.copyFrom(scale)
  }

  public constructor(engine: EngineContext, props?: Partial<SphereProps>) {
    this._props = props ?? { diameter: 1 }
    this._internalMesh = createSphere(engine, { diameter: this._props.diameter })
    this.props = this._props
  }

  public addToScene(scene: SceneContext) {
    addToScene(scene, this._internalMesh)
  }

  public setMaterial(material: Material_) {
    this._internalMesh.material = material
  }

  public addToChildren(obj: BoxObject | SphereObject) {
    this._internalMesh.children.push(obj.internalMesh)
  }
}

export type MaterialProps = {
  color: Color3
}

export class MaterialObject implements SceneVueObject<Partial<MaterialProps>> {
  public elementName = 'Material' as const

  private _props: Partial<MaterialProps>
  private _internalMaterial: StandardMaterialProps

  public get internalMaterial() {
    return this._internalMaterial
  }

  get props(): Partial<MaterialProps> {
    return this._props
  }
  set props(v: Partial<MaterialProps>) {
    this._props = v

    const { r, g, b } = v.color ?? { r: 0, g: 0, b: 0 }
    this._internalMaterial.diffuseColor = [r, g, b]
  }

  public constructor(props?: Partial<MaterialProps>) {
    this._props = props ?? { color: { r: 0, b: 0, g: 0 } }
    const { r, g, b } = props?.color ?? { r: 0, g: 0, b: 0 }
    this._internalMaterial = createStandardMaterial()
    this._internalMaterial.diffuseColor = [r, g, b]
  }
}
