import React, {useEffect, useState} from "react";
import {Link, useLoaderData} from "react-router-dom";
import {Article as ArticleDto, Comment as CommentDto, User} from "../services/dtos";
import {findArticleById} from "../services/articleService";
import {findUserById} from "../services/userService";
import {findCommentsByArticleId} from "../services/commentService";
import {ErrorComponent} from "../components/ErrorComponent";
import {Post} from "../components/Post";
import {Comment} from "../components/Comment";
import {Loading} from "../components/Loading";
import {NoContent} from "../components/NoContent";


export async function loader(x: any) {
    if(isNaN(x.params.id)) {
        return {id: null, loaderErr: new Error("Article ID must be a number")}
    }
    return {id: +x.params.id as number, loaderErr: null}
}

export function Article() {
    const {id, loaderErr } = useLoaderData() as { id: number | null, loaderErr: Error | null}
    const [isLoading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const [article, setArticle] = useState<ArticleDto | null>(null)
    const [comments, setComments] = useState<CommentDto[]>([])
    const [err, setErr] = useState<Error | null>(loaderErr)


    useEffect(() => {
        if(id != null && !loaderErr) {
            Promise
                .all([findCommentsByArticleId(id), findArticleById(id)])
                .then(([comments, article]) => {
                    setComments(comments)
                    setArticle(article)
                    return article
                })
                .then(it => findUserById(it.userId))
                .then(it => setUser(it))
                .catch(err => {
                    setErr(err)
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [id, loaderErr])

    return <div className={"container mx-auto max-w-7xl"}>
        <div className={"underline my-2"}><Link to={"/"}>&lt;&nbsp;Back to main page</Link></div>
        {isLoading &&  <Loading/>}
        {err && <ErrorComponent err={err}/>}
        {article && user ?
            <>
                <Post title={article.title} body={article.body} author={user.name}/>
                <div className={"mx-4 sm:mx-10 flex flex-col gap-5"}>
                    {comments.map(it => (
                        <Comment
                            key={it.id}
                            title={it.name}
                            author={it.email}
                            body={it.body}/>)
                    )}
                </div>
            </>
            : <>{!err && <NoContent/>}</>}
    </div>
}
