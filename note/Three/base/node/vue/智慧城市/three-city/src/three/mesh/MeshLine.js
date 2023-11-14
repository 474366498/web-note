
import * as T from 'three';

export default class MeshLine {
  constructor(geo) {
    const edges = new T.EdgesGeometry(geo)
    this.material = new T.LineBasicMaterial({ color: 0xcccccc })
    const line = new T.LineSegments(edges, this.material)
    this.geometry = edges
    this.mesh = line
  }
}
