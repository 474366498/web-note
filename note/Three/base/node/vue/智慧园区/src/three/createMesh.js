
import City from './mesh/city'
import scene from './scene'


var city

export default function createMesh() {
  city = new City(scene)
}

export function updateMesh(time) {
  city.update(time)
}
