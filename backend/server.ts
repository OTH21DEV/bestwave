
import http from "http"
import app from "./app"


const PORT = process.env.PORT || 13306;

const server = http.createServer(app);
server.keepAliveTimeout = 60000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
