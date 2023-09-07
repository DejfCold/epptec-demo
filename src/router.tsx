import {Home} from "./pages";
import {Article, loader as ArticleLoader} from "./pages/article";
import React from "react";
import {RouteObject} from "react-router-dom";
import {ErrorComponent} from "./components/ErrorComponent";

export const ROUTES: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },{
        path: "/articles/:id",
        element: <Article />,
        loader: ArticleLoader,
    }, {
        path: "*",
        element : <ErrorComponent err={new Error("404 - Path not found :(")} />
    }
]