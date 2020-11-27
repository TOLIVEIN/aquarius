interface Coordinates {
  x: number;
  y: number;
}

interface Letter extends EffectText {
  //   x: number;
  //   y: number;
  //   text: string;
  //   size: number;
  //   shadowColor: number;
  descendValue: number;
  seven: number;
}

interface EffectText {
  x: number;
  y: number;
  text: string;
  size: number;
  shadowColor: number;
}

interface EffectRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}
