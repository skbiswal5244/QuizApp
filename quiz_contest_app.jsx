import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";

export default function QuizContestApp() {
  const [participants, setParticipants] = useState(0);
  const [entryFee, setEntryFee] = useState(20);
  const [winnerPrize, setWinnerPrize] = useState(150);
  const [runnerUpPrize, setRunnerUpPrize] = useState(50);
  const [profit, setProfit] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(false);

  const calculateProfit = () => {
    const totalCollection = participants * entryFee;
    const totalPrize = winnerPrize + 2 * runnerUpPrize;
    setProfit(totalCollection - totalPrize);
  };

  const addParticipant = (name, score) => {
    setLeaderboard([...leaderboard, { name, score }]);
  };

  const processPayment = () => {
    // Mock payment processing
    setTimeout(() => {
      setPaymentStatus(true);
      alert("Payment Successful!");
    }, 2000);
  };

  const selectWinners = () => {
    if (leaderboard.length < 3) {
      alert("Not enough participants to select winners!");
      return;
    }
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);
    alert(`Winners:\n1st: ${sortedLeaderboard[0].name} (₹${winnerPrize})\n2nd: ${sortedLeaderboard[1].name} (₹${runnerUpPrize})\n3rd: ${sortedLeaderboard[2].name} (₹${runnerUpPrize})`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md">
        <Card className="p-6 shadow-xl rounded-2xl bg-white">
          <h1 className="text-xl font-bold text-center">Quiz Contest Calculator</h1>
          <CardContent className="space-y-4 mt-4">
            <div>
              <label>Number of Participants</label>
              <Input type="number" value={participants} onChange={(e) => setParticipants(Number(e.target.value))} />
            </div>
            <div>
              <label>Entry Fee per Participant (₹)</label>
              <Input type="number" value={entryFee} onChange={(e) => setEntryFee(Number(e.target.value))} />
            </div>
            <div>
              <label>Winner Prize (₹)</label>
              <Input type="number" value={winnerPrize} onChange={(e) => setWinnerPrize(Number(e.target.value))} />
            </div>
            <div>
              <label>Runner-up Prize (₹ each)</label>
              <Input type="number" value={runnerUpPrize} onChange={(e) => setRunnerUpPrize(Number(e.target.value))} />
            </div>
            <Button onClick={calculateProfit} className="w-full bg-blue-600 text-white">
              Calculate Profit
            </Button>
            {profit !== 0 && (
              <div className="text-lg font-bold text-center mt-4">
                Your Profit: ₹{profit}
              </div>
            )}
            <Button onClick={processPayment} className="w-full bg-green-600 text-white mt-4">
              {paymentStatus ? "Payment Received" : "Make Payment"}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="p-6 shadow-xl rounded-2xl bg-white mt-6">
          <h2 className="text-lg font-bold text-center">Leaderboard</h2>
          <CardContent>
            <Table>
              {leaderboard.map((player, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.score}</TableCell>
                </TableRow>
              ))}
            </Table>
          </CardContent>
        </Card>
        
        <Button onClick={selectWinners} className="w-full bg-purple-600 text-white mt-4">
          Select Winners Automatically
        </Button>
      </motion.div>
    </div>
  );
}
