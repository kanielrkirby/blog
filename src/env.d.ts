/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />
declare namespace astroHTML.JSX {
  interface IntrinsicAttributes {
    scramble?: number | boolean;
  }
  interface HTMLAttributes {
    scramble?: number | boolean;
  }
  interface IntrinsicElements {
    time: DetailedHTMLProps<
      TimeHTMLAttributes<HTMLTimeElement>,
      HTMLTimeElement
    > & {
      scramble?: boolean;
    };
    time: DetailedHTMLProps<
      HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    > & {
      scramble?: boolean;
    };
  }
}

declare namespace React {
  interface Attributes {
    scramble?: boolean;
  }
}

interface Text {
  /** Custom attribute specifically for scrambling text with `scramble()` */
  __trueTextContent: undefined | string;
}
