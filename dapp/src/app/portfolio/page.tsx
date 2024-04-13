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
    <div className="p-5">
      {testData.map((cask) => {
        return (
          <div className="border rounded p-3" key={cask.caskId}>
            {cask.caskId}
          </div>
        );
      })}
    </div>
  );
};

export default Portfolio;
