module.exports = ({ Assertion }) => {
  
  let assert = {
    hasType: (obj, type) => new Assertion(obj).to.be.an(type),
    hasSameLength: (actual, expected) => new Assertion(actual).to.have.lengthOf(expected.length),
    hasSameType: (actual, expected) => new Assertion(actual).to.be.a(typeof expected),
    hasSameConstructor: (actual, expected) => new Assertion(actual.constructor).to.equal(expected.constructor),
    hasConstructor: (obj, constructor) => new Assertion(obj.constructor).to.equal(constructor),
    hasProperty: (obj, prop) => new Assertion(obj).to.have.property(prop),
    isNull: actual => new Assertion(actual).to.be.null
  }
  
  let isObject = (obj) => typeof obj === "object" && obj !== null
  
  let isFunction = (obj) => typeof obj === "function"
  
  let isAnonymousFunction = (obj) => obj.toString().startsWith("function () {")
  
  let isArray = (obj) => Array.isArray(obj)
  
  let hasConstructorName = (obj, constructor) => obj !== null && obj.constructor.name === constructor
  
  let compareObjects = (actual, expected) => hasConstructorName(expected, "Object") ?
                                             compareStructure(actual, expected) :
                                             assert.hasSameConstructor(actual, expected)
                                             
  let compareFunctions = (actual, expected) => isAnonymousFunction(expected) ?
                                               assert.hasType(actual, "function") :
                                               assert.hasConstructor(actual, expected)
  
  let compareStructure = (actual, expected) => {
    let actualProps = Object.getOwnPropertyNames(actual)
    let expectedProps = Object.getOwnPropertyNames(expected)
    
    assert.hasSameLength(actualProps, expectedProps)
    
    for (let key of expectedProps) {
      let expectedValue = expected[key]
      let actualValue = actual[key]
      
      assert.hasProperty(actual, key)
      
      if (isArray(expectedValue)) {
        assert.hasType(actualValue, "array")
      } else if (isObject(expectedValue)) {
        compareObjects(actualValue, expectedValue)
      } else if (isFunction(expectedValue)) {
        compareFunctions(actualValue, expectedValue)
      } else if (expectedValue === null) {
        assert.isNull(actualValue)
      } else {
        assert.hasSameType(actualValue, expectedValue)
      }
    }
  }
  
  let structuredLike = function (expected) {
    let actual = this._obj
    assert.hasType(actual, "object")
    assert.hasType(expected, "object")
    compareStructure(actual, expected)
  }
  
  Assertion.addMethod("structured", structuredLike)
  Assertion.addMethod("structuredLike", structuredLike)
}
