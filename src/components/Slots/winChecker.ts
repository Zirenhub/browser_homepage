import { TSpin } from '../../types/slots';

function winChecker(spin: TSpin, winIndexes: number[][]) {
  const modifiedWinIndexes = winIndexes.map((i) => {
    return { winIndexes: i, isWin: false };
  });

  const winningFruit = spin[0][winIndexes[0][0]];

  for (let i = 0; i < modifiedWinIndexes.length; i++) {
    const spinRow = spin[i];
    const winRow = modifiedWinIndexes[i].winIndexes;

    const rowIsWin = winRow.every(
      (i) => spinRow[i].content === winningFruit.content
    );
    if (rowIsWin) {
      modifiedWinIndexes[i].isWin = true;
    }
  }

  const isEveryRowWin = modifiedWinIndexes.every((i) => i.isWin);

  if (isEveryRowWin) {
    for (let i = 0; i < modifiedWinIndexes.length; i++) {
      const winRow = modifiedWinIndexes[i];
      const spinRow = spin[i];
      winRow.winIndexes.forEach((i) => {
        spinRow[i].isWin = true;
      });
    }
    return { spin, isWin: true };
  }
  return { spin, isWin: false };
}

export default winChecker;
