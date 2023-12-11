import figlet from "figlet";

const server = Bun.serve({
    fetch(req) {
        const body = figlet.textSync("Bunny!");
        return new Response(body);
    },
    port: 3000,
});

console.log(`Listening on port http://localhost:${server.port}`);
