import { useCallback, useEffect, useState } from 'react';
import { TOption, TSpin } from '../../types/slots';
import variantOne from './combinations/variantOne';

const options: TOption[] = ['🍒', '🍌', '🥭', '🍇', '🍓', '🍍'];

function Slots() {
  const [spinOptions, setSpinOptions] = useState({
    coins: 10000,
    spinValueIndex: 0,
    spinValues: [15, 50, 100, 200, 300, 400, 500],
  });
  const [currentSpin, setCurrentSpin] = useState<TOption[][]>([[], [], []]);

  function checkWin(result: TOption[][]) {
    const modifiedSpin: TSpin = [];
    result.forEach((r) => {
      const modifiedColumn = r.map((r) => {
        return { content: r, isWin: false };
      });
      modifiedSpin.push(modifiedColumn);
    });
    const variantOneIsWin = variantOne(modifiedSpin);
  }

  const spin = useCallback(() => {
    const length = 5;
    const result = [];
    for (let i = 0; i < currentSpin.length; i++) {
      result.push(
        Array.from(
          { length },
          () => options[Math.floor(Math.random() * options.length)]
        )
      );
    }
    checkWin(result);
    return result;
  }, [currentSpin.length]);

  function handleRespin() {
    const { coins, spinValueIndex, spinValues } = spinOptions;
    const currentSpinValue = spinValues[spinValueIndex];
    if (coins > currentSpinValue) {
      setCurrentSpin(spin());
      setSpinOptions((prevState) => {
        return { ...prevState, coins: coins - currentSpinValue };
      });
    }
  }

  function handleSpinValue(operator: '+' | '-') {
    if (
      operator === '+' &&
      spinOptions.spinValueIndex < spinOptions.spinValues.length - 1
    ) {
      setSpinOptions((prevState) => ({
        ...prevState,
        spinValueIndex: prevState.spinValueIndex++,
      }));
    } else if (operator === '-' && spinOptions.spinValueIndex > 0) {
      setSpinOptions((prevState) => ({
        ...prevState,
        spinValueIndex: prevState.spinValueIndex--,
      }));
    }
  }

  useEffect(() => {
    setCurrentSpin(spin());
  }, [spin]);

  return (
    <div className="flex flex-col bg-dim-black p-3 gap-4 rounded-sm shadow-md">
      <div className="flex flex-col gap-1 justify-between text-white">
        <p>{spinOptions.coins} 💰</p>
        <p>Current spin value:</p>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => handleSpinValue('+')}
            className="text-green2 text-3xl h-fit w-fit"
          >
            +
          </button>
          <p>{spinOptions.spinValues[spinOptions.spinValueIndex]}</p>
          <button
            type="button"
            onClick={() => handleSpinValue('-')}
            className="text-red2 text-3xl h-fit w-fit"
          >
            -
          </button>
        </div>
      </div>
      {currentSpin.map((r) => {
        return (
          <div className="flex text-4xl gap-4 border-b-2 border-gray">
            {r.map((s) => {
              return <p className="py-2">{s}</p>;
            })}
          </div>
        );
      })}
      <button
        type="button"
        onClick={handleRespin}
        className="text-white bg-purple font-bold"
      >
        Respin
      </button>
    </div>
  );
}

export default Slots;
