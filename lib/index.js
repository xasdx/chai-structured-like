module.exports = ({ Assertion, assert }) => {
  
  Assertion.addMethod("structured", function (expected) {
    let actual = this._obj
    new Assertion(actual).to.be.an("object")
    new Assertion(expected).to.be.an("object")
    
    let actualProps = Object.getOwnPropertyNames(actual)
    let expectedProps = Object.getOwnPropertyNames(expected)
    
    new Assertion(actualProps).to.have.lengthOf(expectedProps.length)
    
    for (let key of expectedProps) {
      let value = expected[key]
      new Assertion(actual).to.have.property(key)
      if (Array.isArray(value)) {
        new Assertion(actual[key]).to.be.an("array")
      } else {
        new Assertion(actual[key]).to.be.a(typeof value)
      }
    }
    
    this.assert(true)
  })
}
