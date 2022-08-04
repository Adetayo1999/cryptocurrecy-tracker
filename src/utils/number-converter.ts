import millify from "millify";

export const NumberFormatter = (number: number) => {
  return millify(number, {
    precision: 2,
  });
};
