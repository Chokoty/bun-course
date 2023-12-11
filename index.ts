import figlet from "figlet";

const server = Bun.serve({
    fetch(req) {
        const url = new URL(req.url);

        if (url.pathname === "/") {
            const body = figlet.textSync("Bunny!");
            return new Response(body);
        }
        if (url.pathname === "/about") {
            return new Response("About page");
        }
        if (url.pathname === "/contact") {
            return new Response("Contact page");
        }
        if (url.pathname === "/feed") {
            throw new Error("Not implemented");
        }
        if (url.pathname === "/greet") {
            return new Response(Bun.file("greet.txt"));
        }

        return new Response("Not found", { status: 404 });
    },
    error(error) {
        return new Response(`<pre> ${error}\n ${error.stack}</pre>`, {
            headers: { "content-type": "text/html" },
        });
    },
    port: 3000,
});

console.log(`Listening on port http://localhost:${server.port}`);
