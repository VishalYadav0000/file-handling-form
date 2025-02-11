const http = require("http");
const Routes = require("./route")
const server = http.createServer(Routes);

server.listen(3000, () => {
    console.log("Server listening on port 3000...");
});
