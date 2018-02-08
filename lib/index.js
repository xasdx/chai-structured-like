module.exports = ({ Assertion, assert }) => {
  
  let assertType = (obj, type) => new Assertion(obj).to.be.an(type)
  
  let assertSameLength = (actual, expected) => new Assertion(actual).to.have.lengthOf(expected.length)
  
  let assertSameType = (actual, expected) => new Assertion(actual).to.be.a(typeof expected)
  
  let assertSameConstructor = (actual, expected) => new Assertion(actual.constructor).to.equal(expected.constructor)
  
  let isObject = (obj) => typeof obj === "object" && obj !== null
  
  let isFunction = (obj) => typeof obj === "function"
  
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
        assertType(actualValue, "array")
      } else if (isObject(expectedValue)) {
        if (hasConstructor(expectedValue, "Object")) {
          compareStructure(actualValue, expectedValue)
        } else {
          assertSameConstructor(actualValue, expectedValue)
        }
      } else if (isFunction(expectedValue)) {
        if (expectedValue.toString().startsWith("function () {")) {
          assertType(actualValue, "function")
        } else {
          new Assertion(actualValue.constructor).to.equal(expectedValue)
        }
      } else {
        assertSameType(actualValue, expectedValue)
      }
    }
  }
  
  let structuredLike = function (expected) {
    let actual = this._obj
    assertType(actual, "object")
    assertType(expected, "object")
    compareStructure(actual, expected)
  }
  
  Assertion.addMethod("structured", structuredLike)
  Assertion.addMethod("structuredLike", structuredLike)
}
