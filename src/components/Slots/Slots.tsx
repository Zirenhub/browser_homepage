import { useCallback, useEffect, useState } from 'react';
import { TOption, TSpin, TSpinResult } from '../../types/slots';
import winChecker from './winChecker';
import { winCombinations } from './winCombinations';

const options: TOption[] = ['🍒', '🍌', '🥭', '🍇', '🍓', '🍍'];

function Slots() {
  const [spinOptions, setSpinOptions] = useState({
    coins: 10000,
    spinValueIndex: 0,
    spinValues: [15, 50, 100, 200, 300, 400, 500],
  });
  const [currentSpin, setCurrentSpin] = useState<TSpinResult>({
    spin: [[], [], []],
    isWin: false,
  });

  function checkWin(result: TOption[][]) {
    const modifiedSpin: TSpin = [];
    result.forEach((r) => {
      const modifiedColumn = r.map((r) => {
        return { content: r, isWin: false };
      });
      modifiedSpin.push(modifiedColumn);
    });
    for (const combination of winCombinations) {
      const result = winChecker(modifiedSpin, combination);
      if (result.isWin) {
        return result;
      }
    }
    return { spin: modifiedSpin, isWin: false };
  }

  const spin = useCallback(() => {
    const length = 5;
    const spinResult = [];
    for (let i = 0; i < currentSpin.spin.length; i++) {
      spinResult.push(
        Array.from(
          { length },
          () => options[Math.floor(Math.random() * options.length)]
        )
      );
    }
    const result = checkWin(spinResult);
    return result;
  }, [currentSpin.spin.length]);

  function handleRespin() {
    const { coins, spinValueIndex, spinValues } = spinOptions;
    const currentSpinValue = spinValues[spinValueIndex];
    if (coins >= currentSpinValue) {
      const result = spin();
      setCurrentSpin(result);
      setSpinOptions((prevState) => {
        if (result.isWin) {
          const payout = Math.floor(
            spinOptions.spinValues[spinOptions.spinValueIndex] * 0.2
          );
          return {
            ...prevState,
            coins: prevState.coins + payout + coins - currentSpinValue,
          };
        }
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
      {currentSpin.spin.map((r) => {
        return (
          <div className="flex text-4xl gap-4 border-b-2 border-gray">
            {r.map((s) => {
              return (
                <div className={`${s.isWin ? 'bg-[#2590EB]' : ''} p-2`}>
                  <p>{s.content}</p>
                </div>
              );
            })}
          </div>
        );
      })}
      <button
        type="button"
        onClick={handleRespin}
        className="text-white bg-purple font-bold text-2xl"
      >
        Respin
      </button>
    </div>
  );
}

export default Slots;
