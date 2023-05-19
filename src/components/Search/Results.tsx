import { GoogleSearchResult, Pagemap } from '../../types/google';

type Props = {
  results: GoogleSearchResult | null;
};

function getImageSource(pagemap: Pagemap): string | undefined {
  if (pagemap.cse_image?.length) {
    // If there is at least one "cse_image" object, return its source URL
    return pagemap.cse_image[0].src;
  }

  if (pagemap.cse_thumbnail?.length) {
    // If there are no "cse_image" objects but there is at least one "cse_thumbnail" object,
    // return the first thumbnail source URL
    return pagemap.cse_thumbnail[0].src;
  }

  return undefined; // If there are no images, return undefined
}

function Results({ results }: Props) {
  if (results) {
    return (
      <div className="flex flex-col border border-yellow m-2 p-2 rounded-lg shadow-lg overflow-y-scroll">
        {results.map((r) => {
          const imageSource = getImageSource(r.pagemap);
          return (
            <div className="flex flex-col" key={r.link}>
              <div className="flex gap-3 items-center">
                {imageSource && <img src={imageSource} className='h-auto w-12 object-contain' />}
                <a type="button" href={r.link} className="text-aqua font-bold">
                  {r.title}
                </a>
              </div>
              <p className="text-gray2">{r.snippet}</p>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}

export default Results;
