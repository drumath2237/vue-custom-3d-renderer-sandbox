import {
  addToScene,
  createBox,
  createSphere,
  EngineContext,
  Mesh,
  Quat,
  SceneContext,
  Vec3,
  DirectionalLight as DirLight,
  createDirectionalLight,
  StandardMaterialProps,
  createStandardMaterial,
  Color3,
  Material as Material_,
} from '@babylonjs/lite'

export const elementsNames = [
  'Scene',
  'DirectionalLight',
  'Box',
  'Material',
  'Sphere',
  'Null',
] as const

export type ElementsNames = (typeof elementsNames)[number]

export function isElementName(name: string): name is ElementsNames {
  return elementsNames.includes(name as any)
}

export interface SceneVueObject<P> {
  elementName: ElementsNames
  get props(): P
  set props(v: P)
}

export class Null implements SceneVueObject<{}> {
  get props() {
    return {}
  }
  set props(_v: {}) {}
  elementName = 'Null' as const
}

type DirectionalLightProps = {
  direction: Vec3
  intensity: number
}

export class DirectionalLight implements SceneVueObject<Partial<DirectionalLightProps>> {
  elementName = 'Box' as const
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

type BoxProps = {
  size: number
} & TransformProps

export class Box implements SceneVueObject<Partial<BoxProps>> {
  public elementName = 'Box' as const
  private _props: Partial<BoxProps>

  private _internalMesh: Mesh

  public get props() {
    return this._props
  }

  public set props(v: Partial<BoxProps>) {
    this._props = this.props

    const pos = v.position ?? this._internalMesh.position
    const rot = v.rotation ?? this._internalMesh.rotationQuaternion
    const scale = v.scale ?? this._internalMesh.scaling

    this._internalMesh.position.copyFrom(pos)
    this._internalMesh.rotationQuaternion.copyFrom(rot)
    this._internalMesh.scaling.copyFrom(scale)
  }

  public constructor(engine: EngineContext, props: BoxProps) {
    this._props = props
    this._internalMesh = createBox(engine, { size: props.size })
    this.props = props
  }

  public addToScene(scene: SceneContext) {
    addToScene(scene, this._internalMesh)
  }

  public setMaterial(material: Material_) {
    this._internalMesh.material = material
  }
}

type SphereProps = { diameter: number } & TransformProps

export class Sphere implements SceneVueObject<Partial<SphereProps>> {
  public elementName = 'Sphere' as const
  private _props: Partial<SphereProps>

  private _internalMesh: Mesh

  public get props() {
    return this._props
  }

  public set props(v: Partial<SphereProps>) {
    this._props = this.props

    const pos = v.position ?? this._internalMesh.position
    const rot = v.rotation ?? this._internalMesh.rotationQuaternion
    const scale = v.scale ?? this._internalMesh.scaling

    this._internalMesh.position.copyFrom(pos)
    this._internalMesh.rotationQuaternion.copyFrom(rot)
    this._internalMesh.scaling.copyFrom(scale)
  }

  public constructor(engine: EngineContext, props: SphereProps) {
    this._props = props
    this._internalMesh = createSphere(engine, { diameter: props.diameter })
    this.props = props
  }

  public addToScene(scene: SceneContext) {
    addToScene(scene, this._internalMesh)
  }

  public setMaterial(material: Material_) {
    this._internalMesh.material = material
  }
}

type MaterialProps = {
  color: Color3
}

export class Material implements SceneVueObject<Partial<MaterialProps>> {
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

  public constructor(props: Partial<MaterialProps>) {
    this._props = props
    const { r, g, b } = props.color ?? { r: 0, g: 0, b: 0 }
    this._internalMaterial = createStandardMaterial()
    this._internalMaterial.diffuseColor = [r, g, b]
  }
}
