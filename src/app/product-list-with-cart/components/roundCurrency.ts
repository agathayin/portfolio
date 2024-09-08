export default function roundCurrency(num: number = 0, precision: number = 2) {
  let integer = Math.floor(num);
  let decimal = Math.round((num - integer) * Math.pow(10, precision));
  let decimalStr = (String(decimal) + "0000000000").substring(0, precision);
  let str = "$" + String(integer) + "." + decimalStr;
  return str;
}
