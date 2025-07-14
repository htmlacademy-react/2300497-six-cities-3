import '../../public/css/spinner.css';

function Spinner() {
  return (
    <section className="spinner">
      <div className="grid">
        <div className="cup">
          <div className="cup__handler"></div>
          <div className="cup__steam">
            <div className="cup__steam-flow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Spinner;
