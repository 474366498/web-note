
import Girl from './mesh/Girl'
import City from './mesh/city'
import scene from './scene'


var city,
  girl

export default function createMesh() {
  city = new City(scene)
  girl = new Girl(scene)
}

export function updateMesh(time) {
  city.update(time)
  girl.update(time)
}
