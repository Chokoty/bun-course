import { Elysia, t } from "elysia";
import { plugin } from "./plugin";
import { signinDTO } from "./models";
import { sign } from "crypto";

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
    });

// user
app.group("/user", (app) =>
    app
        .post("/sign-in", ({ body }) => body, {
            body: signinDTO,
            response: signinDTO,
        })
        .post("/sign-up", () => "signup route")
        .get("/profile", () => "profile route")
        .get("/:id", () => "user id route")
);

app.group("/v1", (app) =>
    app
        .get("/", () => "v1")
        .group("/products", (app) =>
            app
                .post("/", () => "create product")
                .get(
                    "/:id",
                    ({ params: { id } }) => {
                        return id;
                    },
                    {
                        params: t.Object({
                            id: t.Numeric(),
                        }),
                    }
                )

                .put("/:id", () => "put products by id")
                .delete("/:id", () => "delete products by id")
        )
);

app.listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
