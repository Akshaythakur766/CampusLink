const Button = ({ label, className, onClick }) => {
  return (
    <button className={`flex buttonCol ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
