import express from "express";
import cors from "cors";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { server } from "./mcp-server";

const app = express();

// basic middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // tighten for prod
  })
);

// MCP endpoint – JSON-RPC over HTTP
app.post("/mcp", async (req, res) => {
  try {
    const transport = new StreamableHTTPServerTransport({
      enableJsonResponse: true,
    });

    // Close transport if client disconnects
    res.on("close", () => {
      transport.close().catch(() => {});
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err: any) {
    console.error("MCP /mcp error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: String(err?.message || err) });
    }
  }
});

// health check
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "MCP Express server running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`MCP HTTP server listening at http://localhost:${PORT}`);
});
