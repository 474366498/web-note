
const { track,
  trigger } = require('./reactiveEffect')

function ref(val) {
  return createRef(val)
}

function createRef(value) {
  return new RefImpl(value)
}

class RefImpl {
  constructor(value) {
    this.__v_isRef = true
    this._value = value
  }

  get value() {
    track(this, 'value')
    console.log('ref get', this)
    return this._value
  }

  set value(value) {
    console.log('ref set', value)
    this._value = value
    trigger(this, 'value', value, this._value)
    return true
  }


}



module.exports = ref