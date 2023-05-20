import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletCreator } from './components/WalletCreator';
import { WalletComponent } from './components/Wallet';
import { TransactionsTable } from './components/TransactionsList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WalletCreator />} />
        <Route path="/wallet/:id" element={<WalletComponent />} />
        <Route path="/transactions/:id" element={<TransactionsTable />} />
      </Routes>
    </Router>
  );
}

export default App;








