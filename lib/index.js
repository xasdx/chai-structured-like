module.exports = ({ Assertion, assert }) => {
  
  Assertion.addMethod("structured", function (expected) {
    let actual = this._obj
    new Assertion(actual).to.be.an("object")
    new Assertion(expected).to.be.an("object")
    
    for (let key in expected) {
      if (expected.hasOwnProperty(key)) {
        let value = expected[key]
        new Assertion(actual).to.have.property(key)
        new Assertion(actual[key]).to.be.a(typeof value)
      }
    }
    this.assert(true)
  })
}
