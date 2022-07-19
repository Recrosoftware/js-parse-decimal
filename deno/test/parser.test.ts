import { assertEquals } from "https://deno.land/std@0.148.0/testing/asserts.ts";
import { parseDecimal } from "../src/parser.ts";

Deno.test(`[number] Checks NaN`, () => {
  assertEquals(parseDecimal(0 / 0), {
    nan: true,
    signaling: false,
  });
});
Deno.test(`[number] Checks positive infinity`, () => {
  assertEquals(parseDecimal(1 / 0), {
    nan: false,

    finite: false,
    negative: false,
  });
});
Deno.test(`[number] Checks negative infinity`, () => {
  assertEquals(parseDecimal(-1 / 0), {
    nan: false,

    finite: false,
    negative: true,
  });
});
Deno.test(`[number] Checks positive`, () => {
  assertEquals(parseDecimal(0.1423e3), {
    nan: false,

    finite: true,
    negative: false,

    significand: 1423n,
    exponent: -1n,
  });
});
Deno.test(`[number] Checks negative`, () => {
  assertEquals(parseDecimal(-1.1423e3), {
    nan: false,

    finite: true,
    negative: true,

    significand: 11423n,
    exponent: -1n,
  });
});
Deno.test(`[number] Checks negative zero`, () => {
  assertEquals(parseDecimal(-0), {
    nan: false,

    finite: true,
    negative: true,

    significand: 0n,
    exponent: 0n,
  });
});

Deno.test(`[string] Checks NaN`, () => {
  assertEquals(parseDecimal("NaN"), {
    nan: true,
    signaling: false,
  });
});
Deno.test(`[string] Checks positive infinity`, () => {
  assertEquals(parseDecimal("Infinity"), {
    nan: false,

    finite: false,
    negative: false,
  });
});
Deno.test(`[string] Checks negative infinity`, () => {
  assertEquals(parseDecimal("-Infinity"), {
    nan: false,

    finite: false,
    negative: true,
  });
});
Deno.test(`[string] Checks positive`, () => {
  assertEquals(parseDecimal("623.513e5"), {
    nan: false,

    finite: true,
    negative: false,

    significand: 623513n,
    exponent: 2n,
  });
});
Deno.test(`[string] Checks negative`, () => {
  assertEquals(parseDecimal("-1320"), {
    nan: false,

    finite: true,
    negative: true,

    significand: 132n,
    exponent: 1n,
  });
});
Deno.test(`[string] Checks negative zero`, () => {
  assertEquals(parseDecimal("-0"), {
    nan: false,

    finite: true,
    negative: true,

    significand: 0n,
    exponent: 0n,
  });
});

Deno.test(`[bigint] Checks positive`, () => {
  assertEquals(parseDecimal(423000n), {
    nan: false,

    finite: true,
    negative: false,

    significand: 423n,
    exponent: 3n,
  });
});
Deno.test(`[bigint] Checks negative`, () => {
  assertEquals(parseDecimal(-42n), {
    nan: false,

    finite: true,
    negative: true,

    significand: 42n,
    exponent: 0n,
  });
});
