# Parse Decimal

This library provides a simple `parseDecimal` function that parses the given numerical input (`number`, `bigint`, `string`) into a
DecimalDefinition object that describes the given number.

It can be used as a building block for serializing decimal numbers into a binary format (e.g. ieee754) or to perform arbitrary precision arithmetic.

# Usage

You can simply parse any number as follows

```typescript
import {parse} from 'https://deno.land/x/parse_decimal/mod.ts'


const definition = parse('1.423e422');
// { nan: false, finite: false, negative: false, significand: 1432n, exponent: 419n }
```
