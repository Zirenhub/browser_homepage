import { useEffect, useState } from 'react';
import { Quote } from '../types/quote';
import { getQuote } from '../api/quote';

function QuoteComp() {
  const [quote, setQuote] = useState<Quote | null>({
    category: 'Shitposting',
    author: 'Erdinch',
    quote:
      'Family and friends and faith are the most important things in your life and you should be building friendships.',
  });

  useEffect(() => {
    const init = async () => {
      const resQuote = await getQuote();
      setQuote(resQuote);
    };
    // init();
  }, []);

  return (
    <p className="text-blue2 w-fit">
      {quote?.quote} - <span className="text-green2">{quote?.author}</span>
    </p>
  );
}

export default QuoteComp;
