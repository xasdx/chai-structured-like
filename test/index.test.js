let { expect, use } = require("chai")
let structuredLike = require("../lib")

use(structuredLike)

module.exports = {
  "handles non-object arguments": {
    "rejects primitives": () => expect(() => expect({}).to.be.structured(true)).to.throw(),
    "rejects primitives passed to expect": () => expect(() => expect("").to.be.structured({})).to.throw(),
    "rejects arrays": () => expect(() => expect([]).to.be.structured({})).to.throw(),
    "rejects undefined": () => expect(() => expect(undefined).to.be.structured({})).to.throw(),
    "rejects null": () => expect(() => expect({}).to.be.structured(null)).to.throw(),
    "rejects functions": () => expect(() => expect({}).to.be.structured(() => {})).to.throw(),
    "rejects Dates": () => expect(() => expect(new Date()).to.be.structured({})).to.throw()
  }
}
