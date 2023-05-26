import { useEffect, useState } from "react";
import gutsJPG from "../assets/guts.jpg";
import { Quote } from "../types/quote";
import { getQuote } from "../api/quote";

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
    <div className="flex shrink-0 items-center justify-between leading-none">
      <div className=" w-full flex flex-col">
        <p className="text-[80px] text-aqua font-bold">
          Welcome, <span className="text-red">Erdinch</span>
        </p>
        <p className="ml-auto text-blue2 mr-[10%]">
          {quote?.quote} - <span className="text-green2">{quote?.author}</span>
        </p>
      </div>
      <img
        src={gutsJPG}
        className="max-h-[200px] transition-all hover:border-red/80 max-w-auto object-contain border border-yellow"
      />
    </div>
  );
}

export default QuoteComp;
