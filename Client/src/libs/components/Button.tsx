export const Button = ({
  label,
  className,
  onClick,
}: {
  label: string;
  className: string;
  onClick: () => void;
}) => {
  return (
    <button className={`flex buttonCol ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
