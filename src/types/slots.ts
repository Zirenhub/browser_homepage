export type TOption = '🍒' | '🍌' | '🥭' | '🍇' | '🍓' | '🍍';

type SpinColumn = {
  content: TOption;
  isWin: boolean;
}[];

export type TSpin = SpinColumn[];

export type TSpinResult = { spin: TSpin; isWin: boolean };
