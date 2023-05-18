import './styles/App.css';
import shortcuts from './shortcuts';

function App() {
  function handleNavigate(link: string) {
    window.location.href = link;
    return null;
  }

  return (
    <main className="main-container">
      <div className="search-box-container">
        <input type="text" className="search-box" />
      </div>
      <div className="shortcuts-container">
        {shortcuts.map((s) => {
          return (
            <button
              type="button"
              key={s.key}
              onClick={() => handleNavigate(s.link)}
              className="shortcut-container"
            >
              <img
                src={s.ico}
                alt={s.name}
                className="shortcut-ico"
              />
              <p className="shortcut-text">{s.name}</p>
            </button>
          );
        })}
      </div>
    </main>
  );
}

export default App;
