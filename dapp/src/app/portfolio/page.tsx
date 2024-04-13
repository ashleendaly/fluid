import Link from "next/link";

type Portfolio = {
  caskId: number;
  balance: number;
};

const testData: Portfolio[] = [
  { caskId: 1, balance: 100 },
  { caskId: 2, balance: 200 },
];

const Portfolio = () => {
  return (
    <div className="p-5 flex flex-col gap-2">
      <table>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Price</th>
            <th>Invested</th>
            <th>Units</th>
            <th>Trade</th>
          </tr>
        </thead>
        <tbody>
          {testData.map((cask) => {
            return (
              <tr className="border p-3" key={cask.caskId}>
                <td>{cask.caskId}</td>
                <td>-</td>
                <td>-</td>
                <td>{cask.balance}</td>
                <td>
                  <Link
                    className="bg-green-400 p-1 px-2 rounded"
                    href={`/${cask.caskId}`}
                  >
                    Trade
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
