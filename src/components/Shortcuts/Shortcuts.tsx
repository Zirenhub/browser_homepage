import shortcuts from './data';

function Shortcuts() {
  return (
    <div className='flex ml-2 flex-col items-center justify-between sticky left-0 top-0'>
      {shortcuts.map((s) => {
        return (
          <a
            type="button"
            href={s.link}
            key={s.key}
            className='p-2 w-24 flex flex-col justify-center items-center text-white border border-transparent hover:border-red2 hover:scale-105 transition-all'
          >
            <img src={s.ico} alt={s.name} className='object-contain block h-10 w-10' />
            <p>{s.name}</p>
          </a>
        );
      })}
    </div>
  );
}

export default Shortcuts;
