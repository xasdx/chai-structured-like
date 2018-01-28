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
  },
  "handles identically structured objects": {
    "accepts empty objects": () => expect({}).to.be.structured({}),
    "compares numbers": () => expect({ n: 0 }).to.be.structured({ n: 1 })
  },
  "handles differences in structure": {
    "rejects when number of properties does not match": () => expect(() => expect({ n: 0 }).to.be.structured({ n: 0, m: 0 })).to.throw(),
    "rejects when property is missing": () => expect(() => expect({ n: 0 }).to.be.structured({ m: 0 })).to.throw(),
    "rejects when type of the property differs": () => expect(() => expect({ n: 0 }).to.be.structured({ n: true })).to.throw()
  }
}
