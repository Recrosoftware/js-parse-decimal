import { parseDecimal } from "../src/mod.ts";

const iterations = 100000;

Deno.bench(`string parsing (x${iterations})`, () => {
  for (let i = 0; i < iterations; ++i) {
    parseDecimal("0.12954307529856383346897e513");
  }
});

Deno.bench(`number parsing (x${iterations})`, () => {
  for (let i = 0; i < iterations; ++i) {
    parseDecimal(4.124239993423);
  }
});

Deno.bench(`bigint parsing (x${iterations})`, () => {
  for (let i = 0; i < iterations; ++i) {
    parseDecimal(43981723044132000000000000000n);
  }
});
