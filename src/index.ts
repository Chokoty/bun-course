import { Elysia } from "elysia";

const app = new Elysia()
    .get(
        "/",
        () => "Hello Bun dev, I am gonna build build RESTFUL API with Elysia "
    )
    .state("verson", 1)
    .decorate("getDate", () => new Date())
    .get("post/:id", ({ params: { id } }) => {
        return { id: id, title: "learn bun" };
    })
    // .post("/post", (context) => {
    //     return context;
    // })
    .post("/post", ({ body, set }) => {
        set.status = 201; // 403 forbidden
        return body;
    })
    .get("track/*", () => {
        return "track";
    })
    .get("tracks/", () => {
        return new Response(
            JSON.stringify({
                tracks: [
                    {
                        id: 1,
                        title: "Hello",
                    },
                    {
                        id: 2,
                        title: "World",
                    },
                ],
            }), // body
            {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 200,
            } // response
        );
    })
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
