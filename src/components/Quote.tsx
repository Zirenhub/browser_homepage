import { useEffect, useState } from 'react';
import { Quote } from '../types/quote';
import { getQuote } from '../api/quote';

function QuoteComp() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const init = async () => {
      const resQuote = await getQuote();
      setQuote(resQuote);
    };
    init();
  }, []);

  return (
    <div className="flex items-end leading-none justify-between grow">
      <p className="text-[40px] grow text-aqua font-bold break-keep">
        Welcome, <span className="text-red">Erdinch</span>
      </p>
      <p className="text-blue2 text-right w-fit">
        {quote?.quote} - <span className="text-green2">{quote?.author}</span>
      </p>
    </div>
  );
}

export default QuoteComp;
