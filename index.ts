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

        return new Response("Not found", { status: 404 });
    },
    port: 3000,
});

console.log(`Listening on port http://localhost:${server.port}`);
