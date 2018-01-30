module.exports = ({ Assertion, assert }) => {
  
  let assertObject = (obj) => new Assertion(obj).to.be.an("object")
  
  let isObject = (obj) => typeof obj === "object" && obj !== null
  
  let compareStructure = (actual, expected) => {
    let actualProps = Object.getOwnPropertyNames(actual)
    let expectedProps = Object.getOwnPropertyNames(expected)
    
    new Assertion(actualProps).to.have.lengthOf(expectedProps.length)
    
    for (let key of expectedProps) {
      let value = expected[key]
      new Assertion(actual).to.have.property(key)
      
      if (Array.isArray(value)) {
        new Assertion(actual[key]).to.be.an("array")
      } else if (isObject(value)) {
        compareStructure(actual[key], value)
      } else {
        new Assertion(actual[key]).to.be.a(typeof value)
      }
    }
  }
  
  Assertion.addMethod("structured", function (expected) {
    
    let actual = this._obj
    
    assertObject(actual)
    assertObject(expected)
    
    compareStructure(actual, expected)
    
    this.assert(true)
  })
}
