# immutable-component
immutable-component to make state immutable


## Usage

```javascript
    this.setState({
        'a.b': 1
    })
    // or 
    this.setState(prevState => {
        prevState.a.b = 1
    })

    // Either return a new value *or* modify the draft
    this.setState(prevState => {
        prevState.a.b.c = 1
        return { a: { b: 1 } }
    })
```
