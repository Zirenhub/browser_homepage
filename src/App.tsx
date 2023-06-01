import './index.css';
import Shortcuts from './components/Shortcuts/Shortcuts';
import Clock from './components/Clock';
import Notes from './components/Notes/Notes';
import Quote from './components/Quote';
import Weather from './components/Weather/Weather';

function App() {
  return (
    <main className="bg-background h-full w-full flex flex-col p-2 overflow-scroll">
      <div className="h-full flex flex-col gap-3 items-start overflow-hidden">
        <Clock />
        <Notes />
      </div>
      <div className="flex items-end">
        <Shortcuts />
        <div className="flex grow">
          <div className="flex flex-col justify-end px-4">
            <p className="text-4xl font-bold text-aqua2 break-keep">
              Welcome, <span className="text-red2">Erdinch</span>
            </p>
            <Quote />
          </div>
          <Weather />
        </div>
      </div>
    </main>
  );
}

export default App;
