import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Asset</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Invested</TableHead>
            <TableHead>Units</TableHead>
            <TableHead className="text-right">Trade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testData.map((cask) => {
            return (
              <TableRow className="border p-3" key={cask.caskId}>
                <TableCell>{cask.caskId}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{cask.balance}</TableCell>
                <TableCell>
                  <Link
                    className="bg-green-400 p-1 px-2 rounded"
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
