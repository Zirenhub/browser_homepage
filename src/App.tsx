import './index.css';
import { search } from './api/google';
import { useState } from 'react';
import { GoogleSearchResult } from './types/google';
import Shortcuts from './components/Shortcuts/Shortcuts';
import Results from './components/Search/Results';
import Clock from './components/Clock';
import Notes from './components/Notes';

function App() {
  const [searchResults, setSearchResults] = useState<GoogleSearchResult | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState('');

  async function handleSearch() {
    const data = await search(searchQuery);
    if (data) {
      setSearchResults(data);
    }
  }

  function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && searchQuery) {
      handleSearch();
    }
  }

  function handleInputChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setSearchQuery(target.value);
  }

  function handleClearResults() {
    setSearchResults(null);
  }

  return (
    <main className="bg-background p-4 flex flex-col h-full">
      <div className="flex w-full justify-center items-center relative">
        <div className="w-[40%]">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleSubmit}
            placeholder="Search"
            className="pb-1 bg-transparent w-full outline-none text-center text-white focus:border-b-red/70 border-b-yellow/25 border-b"
          />
        </div>
        {searchResults && (
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
        {searchResults ? (
          <Results results={searchResults} />
        ) : (
          <div className="flex-1 px-2 flex flex-col gap-3">
            <Clock />
            <Notes />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
