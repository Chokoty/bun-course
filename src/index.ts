import { Elysia } from "elysia";
import { plugin } from "./plugin";

// Application
const app = new Elysia()
    .use(plugin)
    .get(
        "/",
        () => "Hello Bun dev, I am gonna build build RESTFUL API with Elysia "
    )
    // .state("verson", 1)
    .state({
        id: 1,
        verson: 1,
        email: "sample@gmail.com",
    })
    .decorate("getDate", () => new Date())
    .get("post/:id", ({ params: { id } }) => {
        return { id: id, title: "learn bun" };
    })
    // .post("/post", (context) => {
    //     return context;
    // })
    .post("/post", ({ body, set, store }) => {
        console.log(store);
        set.status = 201; // 403 forbidden
        return body;
    })
    .get("track/*", () => {
        return "track";
    })
    .get("tracks/", ({ store, getDate }) => {
        // return new Response(
        // JSON.stringify({
        //     tracks: [
        //         {
        //             id: 1,
        //             title: "Hello",
        //         },
        //         {
        //             id: 2,
        //             title: "World",
        //         },
        //     ],
        // }), // body
        // {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     status: 200,
        // } // response
        // );
        console.log(store.verson);
        console.log(getDate());
        console.log(store["plugin-verson"]);
        return {
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
        };
    })
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
