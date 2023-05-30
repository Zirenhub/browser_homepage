import './index.css';
import { search } from './api/google';
import { useState } from 'react';
import { GoogleSearchResult } from './types/google';
import Shortcuts from './components/Shortcuts/Shortcuts';
import Results from './components/Search/Results';
import Clock from './components/Clock';
import Notes from './components/Notes';
import Quote from './components/Quote';

type SearchProps = {
  searchResults: GoogleSearchResult | null;
  searchQuery: string;
};

function App() {
  const [searchProps, setSearchProps] = useState<SearchProps>({
    searchResults: null,
    searchQuery: '',
  });

  async function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && searchProps.searchQuery) {
      const data = await search(searchProps.searchQuery);
      if (data) {
        setSearchProps((prevState) => {
          return { ...prevState, searchResults: data };
        });
      }
    }
  }

  function handleInputChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setSearchProps((prevState) => {
      return { ...prevState, searchQuery: target.value };
    });
  }

  function handleClearResults() {
    setSearchProps((prevState) => {
      return { ...prevState, searchResults: null };
    });
  }

  return (
    <main className="bg-background p-4 flex flex-col h-full">
      <div className="flex w-full justify-center items-center relative">
        <div className="w-[40%]">
          <input
            type="text"
            value={searchProps.searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleSubmit}
            placeholder="Search"
            className="pb-1 bg-transparent w-full outline-none text-center text-white focus:border-b-red/70 border-b-yellow/25 border-b"
          />
        </div>
        {searchProps.searchResults && (
          <button
            type="button"
            onClick={handleClearResults}
            className="text-aqua font-bold absolute right-0"
          >
            Clear Results
          </button>
        )}
      </div>
      <div className="flex h-full py-2 relative overflow-y-scroll">
        <Shortcuts />
        {searchProps.searchResults ? (
          <Results results={searchProps.searchResults} />
        ) : (
          <div className="flex px-3 flex-col h-full w-full justify-between">
            <div className="flex grow max-h-full">
              <div className="flex flex-col gap-3">
                <Clock />
                <Notes />
              </div>
            </div>
            <Quote />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
