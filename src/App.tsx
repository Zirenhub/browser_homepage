import './index.css';
import Shortcuts from './components/Shortcuts/Shortcuts';
import Clock from './components/Clock';
import Notes from './components/Notes/Notes';
import Quote from './components/Quote';
import Weather from './components/Weather/Weather';
import Slots from './components/Slots/Slots';

function App() {
  return (
    <main className="bg-background h-full w-full flex flex-col p-2 overflow-scroll">
      <div className="h-full flex overflow-hidden">
        <div className="flex flex-col gap-3">
          <Clock />
          <Notes />
        </div>
        <div className="ml-auto">
          <Slots />
        </div>
      </div>
      <div className="flex items-end">
        <Shortcuts />
        <div className="flex grow justify-between">
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
