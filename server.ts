import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route for scanning GitHub achievements
  app.get("/api/scan/:username", async (req, res) => {
    const { username } = req.params;
    try {
      // Fetch the achievements tab of the user
      const response = await fetch(`https://github.com/${username}?tab=achievements`);
      
      if (!response.ok) {
        return res.status(response.status).json({ error: "User not found or GitHub error" });
      }

      const html = await response.text();
      
      // List of known achievement IDs to look for in the HTML
      const knownIds = [
        "quickdraw",
        "yolo",
        "pair-extraordinaire",
        "pull-shark",
        "heart-on-your-sleeve",
        "starstruck",
        "galaxy-brain",
        "arctic-code-vault-contributor",
        "mars-2020-contributor"
      ];

      // Simple detection: look for achievement IDs in the HTML
      // GitHub usually includes them in URLs or alt texts
      const unlockedIds = knownIds.filter(id => {
        // Check for the presence of the achievement ID in the HTML
        // This is a heuristic but works well for public profiles
        const regex = new RegExp(`achievement=${id}|achievements/${id}`, 'i');
        return regex.test(html);
      });

      res.json({ unlockedIds });
    } catch (error) {
      console.error("Scan error:", error);
      res.status(500).json({ error: "Failed to scan profile" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
