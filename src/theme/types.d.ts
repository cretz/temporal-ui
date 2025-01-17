type CSSVariable = `--${string}`;

type RGB = `${number} ${number} ${number}`;

type Variables<K extends string = CSSVariable> = Readonly<
  Record<K, RGB | `var(${CSSVariable})`>
>;

type HexColor = `#${string}`;

type Shade =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950
  | 'DEFAULT';
