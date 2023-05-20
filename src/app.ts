import express from 'express';
import cors from 'cors'
import walletRoutes from "./routes/walletRoute";
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public", "build")));
app.use('/api', walletRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,"..", "public","build","index.html"));
});

export default app