import './index.css';
import { search } from './api/google';
import { useState } from 'react';
import { GoogleSearchResult } from './types/google';
import Shortcuts from './components/Shortcuts/Shortcuts';
import Results from './components/Search/Results';

function App() {
  const [searchResults, setSearchResults] = useState<GoogleSearchResult | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState('');

  async function handleSearch() {
    if (searchQuery) {
      const data = await search(searchQuery);
      if (data) {
        setSearchResults(data);
      }
    }
  }

  function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  function handleInputChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setSearchQuery(target.value);
  }

  function handleClearResults() {
    setSearchResults(null)
  }

  return (
    <main className="bg-background p-4 flex flex-col h-full">
      <div className="flex w-full justify-center">
        <div className="w-[40%] ml-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleSubmit}
            placeholder="Search"
            className="pb-1 bg-transparent w-full outline-none text-center text-white border-b-red/70 focus:border-b-yellow/90 border-b"
          />
        </div>
        <button type="button" onClick={handleClearResults} className="text-aqua font-bold ml-auto">
          Clear Results
        </button>
      </div>
      <div className="flex h-[95%]">
        <Shortcuts />
        <Results results={searchResults} />
      </div>
    </main>
  );
}

export default App;
