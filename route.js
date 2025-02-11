const handleRoutes=(req,res)=>{
    let url = req.url;
    let method = req.method;

    if (url === "/" && method === "GET") {
        res.setHeader("Content-Type", "text/html");
        res.end(`
            <form action="/submit" method="POST">
                <label>Name: </label>
                <input type="text" name="username">
                <button type="submit">Submit</button>
            </form>
        `);
    }

    // Handle Form Submission
    else if (url === "/submit" && method === "POST") {
        let body = [];
        req.on("data", (chunk) => {
            console.log("Received chunk: ", chunk);
            body.push(chunk); // Collect data chunks
        });

        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log("Full Buffer Data: ", parsedBody);
            const username = parsedBody.split("=")[1];
            
            res.setHeader("Content-Type", "text/html");
            res.end(`<h1>${decodeURIComponent(username)}</h1>
            <form action="/submit" method="POST">
                <label>Name: </label>
                <input type="text" name="username">
                <button type="submit">Submit</button>
            </form>`);
        });
    }

    // Handle Other Routes
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>404 Not Found</h1>");
    }
}

module.exports = handleRoutes