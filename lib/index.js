module.exports = ({ Assertion, assert }) => {
  
  let assertObject = (obj) => new Assertion(obj).to.be.an("object")
  
  let assertArray = (obj) => new Assertion(obj).to.be.an("array")
  
  let assertSameLength = (actual, expected) => new Assertion(actual).to.have.lengthOf(expected.length)
  
  let assertSameType = (actual, expected) => new Assertion(actual).to.be.a(typeof expected)
  
  let assertSameConstructor = (actual, expected) => new Assertion(actual.constructor).to.equal(expected.constructor)
  
  let isObject = (obj) => typeof obj === "object" && obj !== null
  
  let hasConstructor = (obj, constructor) => obj !== null && obj.constructor.name === constructor
  
  let compareStructure = (actual, expected) => {
    let actualProps = Object.getOwnPropertyNames(actual)
    let expectedProps = Object.getOwnPropertyNames(expected)
    
    assertSameLength(actualProps, expectedProps)
    
    for (let key of expectedProps) {
      let expectedValue = expected[key]
      let actualValue = actual[key]
      
      new Assertion(actual).to.have.property(key)
      
      if (Array.isArray(expectedValue)) {
        assertArray(actualValue)
      } else if (isObject(expectedValue)) {
        if (hasConstructor(expectedValue, "Object")) {
          compareStructure(actualValue, expectedValue)
        } else {
          assertSameConstructor(actualValue, expectedValue)
        }
      } else {
        assertSameType(actualValue, expectedValue)
      }
    }
  }
  
  let structuredLike = function (expected) {
    let actual = this._obj
    assertObject(actual)
    assertObject(expected)
    compareStructure(actual, expected)
  }
  
  Assertion.addMethod("structured", structuredLike)
  Assertion.addMethod("structuredLike", structuredLike)
}
