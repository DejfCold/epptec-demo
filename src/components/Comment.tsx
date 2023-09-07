import React from "react";

interface Props {
    title: string,
    body: string,
    author: string,
    className?: string
}
export function Comment(props: Props) {
    return <article className={"bg-slate-400 dark:bg-slate-600 p-5 rounded-lg shadow-2xl text-sm sm:text-xl"}>
        <h2 className={"font-bold text-xl sm:text-2xl"}>{props.title}</h2>
        <div className={"italic underline"}>{props.author}</div>
        <article>{props.body}</article>
    </article>
}