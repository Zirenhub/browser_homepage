import './index.css';
import Shortcuts from './components/Shortcuts/Shortcuts';
import Clock from './components/Clock';
import Notes from './components/Notes';
import Quote from './components/Quote';

function App() {
  return (
    <main className="bg-background h-full w-full flex flex-col p-2">
      <div className="grow">
        <Clock />
      </div>
      <div className="flex items-end gap-3">
        <Shortcuts />
        <Quote />
      </div>
    </main>
  );
}

export default App;
