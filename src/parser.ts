const NUMERIC_DECIMAL =
  /^([+-]?)((?:0|[1-9]\d*)(?:\.\d*)?|\.\d+)(?:[eE]([+-]?(?:0|[1-9]\d*)))?$/;

export type DecimalDefinition =
  | DecimalDefinitionNaN
  | DecimalDefinitionInfinite
  | DecimalDefinitionFinite;

export type DecimalDefinitionNaN = {
  nan: true;

  signaling: boolean;
};

export type DecimalDefinitionInfinite = {
  nan: false;

  finite: false;
  negative: boolean;
};

export type DecimalDefinitionFinite = {
  nan: false;

  finite: true;
  negative: boolean;

  significand: bigint;
  exponent: bigint;
};

/**
 * This function parses number values in the form of string, number or bigint value types and returns a
 * DecimalDefinition object that represents its content.
 *
 * Any input value that is either of an unknown type or it's a string that does not represent a numeric value
 * will be treated as NaN.
 *
 * @param value the numerical value that you want to parse
 */
export function parseDecimal(
  value: string | number | bigint,
): DecimalDefinition {
  if (typeof value === "number") {
    if (Number.isNaN(value)) {
      return {
        nan: true,
        signaling: false,
      };
    }

    if (!Number.isFinite(value)) {
      return {
        nan: false,
        finite: false,
        negative: value < 0,
      };
    }

    const str = value.toString();

    // Add support for negative 0
    if (str === "0" && Object.is(value / Number.POSITIVE_INFINITY, -0)) {
      value = "-0";
    } else {
      value = str;
    }
  }

  if (typeof value === "string") {
    if (/[+-]?Infinity/.test(value)) {
      return {
        nan: false,
        finite: false,
        negative: value[0] === "-",
      };
    }

    const result = NUMERIC_DECIMAL.exec(value);
    if (!result) {
      return {
        nan: true,
        signaling: false,
      };
    }

    const negative = result[1] === "-";
    const digitsParts = result[2]!.split(".");

    let digits = digitsParts[0] || "";
    let exponent = BigInt(result[3] || "0") + BigInt(digits.length);

    digits = (digits + (digitsParts[1] || "")).replace(/0*$/, "");

    const rawDigitsLength = digits.length;
    digits = digits.replace(/^0*/, "") || "0";
    const exponentShift = (rawDigitsLength - digits.length);

    if (digits === "0") {
      exponent = 0n;
    } else {
      exponent -= BigInt(digits.length + exponentShift);
    }

    return {
      nan: false,
      finite: true,
      negative,
      significand: BigInt(digits),
      exponent,
    };
  }

  if (typeof value === "bigint") {
    let digits = value as bigint;

    if (digits === 0n) {
      return {
        nan: false,

        finite: true,
        negative: false,

        significand: 0n,
        exponent: 0n,
      };
    }

    const negative = digits < 0n;
    if (negative) digits = -digits;

    const rawSignificand = digits.toString();
    const significand = rawSignificand.replace(/0+/, "");

    const exponent = BigInt(rawSignificand.length - significand.length);
    digits = BigInt(significand);

    return {
      nan: false,
      finite: true,
      negative,
      significand: digits,
      exponent,
    };
  }

  return {
    nan: true,
    signaling: false,
  };
}
