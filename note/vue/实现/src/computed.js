const { ReactiveEffect, trackEffects } = require("./reactiveEffect")


class ComputedRefImpi {
  constructor(getter) {
    console.log(5, getter)
    this._effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true

        for (const effect of this.dep) {
          if (effect.scheduler) {
            effect.scheduler()
          } else {
            effect.run()
          }
        }
      }
    })
    this.dep = new Set()
    this._dirty = true
    this._value = null
  }
  get value() {
    trackEffects(this.dep)
    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run()
    }
    return this._value
  }
}

function computed(opts) {
  return new ComputedRefImpi(opts)
}
module.exports = { computed }



