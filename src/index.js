import { PureComponent } from 'react'
import Immutable from 'seamless-immutable'

class ImmutableComponent extends PureComponent {
  set state(obj) {
    this.immutableState = Immutable.static(obj)
  }

  get state() {
    return this.immutableState
  }

  setState(obj, cb) {
    let nextState = this.immutableState
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      nextState = Immutable.static.setIn(this.immutableState, key.split('.'), value)
    })
    super.setState(nextState, cb)
  }
}

export default ImmutableComponent
