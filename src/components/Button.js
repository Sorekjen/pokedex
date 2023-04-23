
function Button({label, callback, highlighted}) {
  const handleClick = () => {
    console.log("button clicked: " + label)
    callback(label);
  }

  return (
    <button
        className={`${label} ${highlighted ? "highlighted" : ""}` }
        onClick={()=> handleClick(label)}
      
    >
      {label}
    </button>
  );
} export default Button;