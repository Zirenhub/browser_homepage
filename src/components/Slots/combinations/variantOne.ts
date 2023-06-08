import { TSpin } from '../../../types/slots';

function variantOne(spin: TSpin) {
  const columnLength = spin.length;
  const rowLength = spin[0].length;

  const winIndexes = [
    [0, 2, 4], // Row 1
    [1, 3], // Row 2
    [0, 2, 4], // Row 3
  ];
}

export default variantOne;
