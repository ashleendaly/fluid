import Link from "next/link";
// import { useState, useEffect, useContext } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// creating a data type.
// type SingleCask = {
//   caskId: number;
//   balance: number;
// };


const Portfolio = () => {

  // const portfolio: SingleCask[] = [];
  // const [price, setPrice] = useState(0);

  // useEffect(() => {
  //   fetchPortfolioCasks();
  //   fetchCurrentPrice();
  // }, []);

  type Portfolio = {
    caskId: number;
    balance: number; // number of units owned.
    invested: number; // number of XRP had been invested at the exchange
  };

  const testData: Portfolio[] = [
    { caskId: 1, balance: 100, invested: 10 },
    { caskId: 2, balance: 200, invested: 15 },
  ];


  // // fetching from backend AND setting portfolio variable.
  // const fetchPortfolioCasks = async () => {
  //   // casksHeldByID = contact.generatePorfolio;
  //   // for (uint256 i = 0; i < casksHeldByID.length; i++) {
  //   //   const singleCask: SingleCask = { caskId: casksHeldByID[i], balance: balanceOf(owner, casksHeldByID[i]) }
  //   //   portfolio.push(singleCask)
  //   // }
  // }

  const fetchCurrentPrice = async () => {
    // TODO: make a call to the liquidity pool contract that enable us to get price through the getBuyPrice method.
    setPrice(price);
  }


  // Cask is the cask ID fetched above.
  // Price is the 
  // Invested is the number of XRP invested to get these cask tokens : when the user invokes a the function in one of the contracts to "buy" tokens using XRP, that has to update the above with the amount of XRP
  // Units Owned is the same "balance" in Portfolio data type above- it gets fetched.

  return (
    <div className="p-5">
      <Table className="w-full border-collapse">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-2 px-4 text-sm font-semibold text-gray-600">Cask ID ({testData.length})</TableHead>
            <TableHead className="py-2 px-4 text-sm font-semibold text-gray-600">Price</TableHead>
            <TableHead className="py-2 px-4 text-sm font-semibold text-gray-600">Invested (XRP)</TableHead>
            <TableHead className="py-2 px-4 text-sm font-semibold text-gray-600">Tokens Owned</TableHead>
            <TableHead className="py-2 px-4 text-sm font-semibold text-gray-600 text-right">Trade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testData.map((cask) => {
            return (
              <TableRow className="border-b border-gray-200" key={cask.caskId}>
                <TableCell className="py-2 px-4">{cask.caskId}</TableCell>
                <TableCell className="py-2 px-4">-</TableCell>
                <TableCell className="py-2 px-4">{cask.invested}</TableCell>
                <TableCell className="py-2 px-4">{cask.balance}</TableCell>
                <TableCell className="py-2 px-4 text-right">
                  <Link
                    className="text-white bg-green-500 hover:bg-green-600 py-1 px-2 rounded-md"
                    href={`/${cask.caskId}`}
                  >
                    Trade
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
