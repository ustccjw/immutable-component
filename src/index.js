import { PureComponent } from 'react'
import Immutable from 'seamless-immutable'

class ImmutableComponent extends PureComponent {
  set state(obj) {
    this.immutableState = Immutable.static(obj)
    this.batchState = this.immutableState
  }

  get state() {
    return this.immutableState
  }

  setState(obj, cb) {
    this.batchState = this.batchState || Immutable.static({})
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      this.batchState = Immutable.static.setIn(this.batchState, key.split('.'), value)
    })
    super.setState(this.batchState, cb)
  }
}

export default ImmutableComponent
