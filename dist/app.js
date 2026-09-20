import express from "express";
import accountRoutes from "./routes/account.routes.js";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/accounts", accountRoutes);
app.get("/", (_req, res) => {
    res.json({
        name: "Unified API workspace",
        version: "1.0.0",
        status: "running"
    });
});
app.get("/health", (_req, res) => {
    res.json({
        status: "ok",
        service: "unified-api-workspace"
    });
});
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
