import React from "react";
import {Link} from "react-router-dom";

interface Props {
    articleId: number
    commentCount: number
    title: string,
    body: string,
    author: string
}
export function PostPreview(props: Props) {
    return <article className={"rounded-lg bg-slate-500 dark:bg-slate-700 p-5 shadow-2xl"}>
        <h2 className={"font-bold text-xl sm:text-3xl"}>{props.title}</h2>
        <div>Author: {props.author}</div>
        <div className={"my-3 max-h-10 truncate"}>{props.body}</div>
        <div className={"flex justify-between"}>
            <div className={"underline"}><Link to={`articles/${props.articleId}`}>Show more...</Link></div>
            <div>Comments ({props.commentCount})</div>
        </div>
    </article>
}