import React from "react";

interface Props {
    title: string,
    body: string,
    author: string
}
export function Post(props: Props) {
    return <article className={"rounded-lg bg-slate-500 dark:bg-slate-700 p-5 mb-5 shadow-2xl"}>
        <h1 className={"font-bold text-xl sm:text-3xl"}>{props.title}</h1>
        <div className={"italic underline"}>{props.author}</div>
        <div className={"my-3"}>{props.body}</div>
    </article>
}