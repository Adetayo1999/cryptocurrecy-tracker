import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCryptos } from "../../store/reducers/crypto";
import { getCurrency } from "../../utils/currency-converter";
import { NumberFormatter } from "../../utils/number-converter";

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

export default function TrackerTable() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCryptos());

    const interval = setInterval(() => {
      dispatch(fetchCryptos());
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const { crypto, cryptoError, loadingCrypto } = useAppSelector(
    (state) => state.crypto
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      NAME
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      PRICE
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      PCT CHANGE
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      MARKET CAP
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      VOLUME
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {crypto.map((currency, index) => {
                    const percentageChange =
                      Number(currency["1d"].price_change_pct) * 100;
                    return (
                      <tr
                        key={currency.id}
                        className={`${index % 2 === 0 && "bg-gray-50"}`}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm   sm:pl-6">
                          {currency.rank}
                        </td>
                        <td className="whitespace-nowrap flex gap-2 items-center px-3 py-4 text-sm text-gray-500">
                          <img
                            src={currency.logo_url}
                            className="h-8 w-8 object-contain"
                            alt={currency.name}
                          />
                          <span className="font-medium text-gray-700">
                            {currency.name}
                          </span>
                          <span>{currency.id}</span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {getCurrency(Number(currency.price))}
                        </td>
                        <td
                          className={`whitespace-nowrap px-3 py-4 text-sm ${
                            percentageChange > 0
                              ? "text-green-500"
                              : "text-red-500"
                          } `}
                        >
                          {percentageChange.toPrecision(2)}%
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          ${NumberFormatter(Number(currency.market_cap))}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          ${NumberFormatter(Number(currency["1d"].volume))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
