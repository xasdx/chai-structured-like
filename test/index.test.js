let { expect, use } = require("chai")
let structuredLike = require("../lib")

use(structuredLike)

function Car() {}
function Boat() {}

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
    "compares numbers": () => expect({ n: 0 }).to.be.structured({ n: 1 }),
    "compares multiple properties": () => expect({ n: 0, m: true, s: "hi" }).to.be.structured({ n: 1, m: false, s: "hey" }),
    "compares arrays": () => expect({ a: [true] }).to.be.structured({ a: [] }),
    "compares inner objects": () => expect({ a: 1, b: { c: "" }}).to.be.structured({ a: 123, b: { c: "str" }}),
    "compares objects built by a constructor function": () => expect({ obj: new Car() }).to.be.structured({ obj: new Car() })
  },
  "handles differences in structure": {
    "rejects when number of properties does not match": () => expect(() => expect({ n: 0 }).to.be.structured({ n: 0, m: 0 })).to.throw(),
    "rejects when property is missing": () => expect(() => expect({ n: 0 }).to.be.structured({ m: 0 })).to.throw(),
    "rejects when type of the property differs": () => expect(() => expect({ n: 0 }).to.be.structured({ n: true })).to.throw(),
    "rejects when properties are missing": () => expect(() => expect({ n: 0 }).to.be.structured({ n: 1, m: "hello" })).to.throw(),
    "rejects when contains more properties": () => expect(() => expect({ n: 0, m: true }).to.be.structured({ m: false })).to.throw(),
    "rejects when inner objects do not match": () => expect(() => expect({ n: { a: 1 } }).to.be.structured({ n: { a: true } })).to.throw(),
    "rejects when inner objects of inner objects do not match": () => {
      expect(() => expect({ n: { a: { b: 1 } }}).to.be.structured({ n: { a: { b: "" } }})).to.throw()
    },
    "rejects when objects are built by different constructors": () => expect(() => expect({ obj: new Car() }).to.be.structured({ obj: new Boat() })).to.throw()
  },
  "supports structuredLike alias": () => expect({ a: 0 }).to.be.structuredLike({ a: 0 })
}
