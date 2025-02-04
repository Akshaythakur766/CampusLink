import loading from '../../public/spinner.gif';

const Spinner = () => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 999, backgroundColor: 'rgba(189, 189, 189, 0.7)' }}>
      <div>
        <img src={loading} alt='loading' width={30} />
      </div>
    </div>
  );
};

export default Spinner;
