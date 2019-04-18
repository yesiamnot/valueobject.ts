import {TypeHolderDictionary, Restore, type} from "./type_indicator";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStaticAssert = <T extends TypeHolderDictionary>(_1: T) => (
  _2: Restore<T>,
): void => {
  /** raise compiling error if bad type match. */
};

describe("Static type functions", () => {
  it("Basic example", () => {
    const assert = createStaticAssert({
      foo: type<string>(),
      bar: type<number | string>(),
      baz: type<null | undefined>(),
    });
    assert({
      foo: "str",
      bar: 0,
      baz: undefined,
    });
    assert({
      foo: "str",
      bar: "str",
      baz: undefined,
    });
    assert({
      foo: "str",
      bar: "str",
      baz: null,
    });
  });

  it("Alias example", () => {
    const assert = createStaticAssert({
      foo: type.optional(type.string),
      bar: type.array(type.number),
      baz: type.union(type.null, type.undefined),
    });
    assert({
      bar: [],
      baz: null,
    });
    assert({
      foo: "str",
      bar: [0, 1, 2],
      baz: undefined,
    });
  });
});