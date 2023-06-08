export type TOption = '🍒' | '🍌' | '🥭' | '🍇' | '🍓' | '🍍';

type SpinColumn = {
  content: TOption;
  isWin: boolean;
}[];

export type TSpin = SpinColumn[];
