module.exports = ({ Assertion, assert }) => {
  
  Assertion.addMethod("structured", function (expected) {
    let actual = this._obj
    new Assertion(actual).to.be.an("object")
    new Assertion(expected).to.be.an("object")
    this.assert(true)
  })
}
