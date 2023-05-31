import './index.css';
import Shortcuts from './components/Shortcuts/Shortcuts';
import Clock from './components/Clock';
import Notes from './components/Notes/Notes';
import Quote from './components/Quote';

function App() {
  return (
    <main className="bg-background h-full w-full flex flex-col p-2 overflow-scroll">
      <div className="h-full flex flex-col gap-3 items-start overflow-hidden">
        <Clock />
        <Notes />
      </div>
      <div className="flex items-end">
        <div className="flex flex-col items-start gap-3">
          <p className="text-4xl font-bold text-aqua2 break-keep">
            Welcome, <span className="text-red2">Erdinch</span>
          </p>
          <Shortcuts />
        </div>
        <Quote />
      </div>
    </main>
  );
}

export default App;
