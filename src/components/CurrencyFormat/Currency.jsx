import numeral from "numeral";
const Currency = ({ amount }) => {
  const FormalAmount = numeral(amount).format("$0,0.00");
  return <div>{FormalAmount}</div>;
};

export default Currency;
