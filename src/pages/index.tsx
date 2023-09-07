import {findArticles} from "../services/articleService";
import React, {useEffect, useState} from "react";
import {findUsers} from "../services/userService";
import {Article, User} from "../services/dtos";
import {findComments} from "../services/commentService";
import {ErrorComponent} from "../components/ErrorComponent";
import {PostPreview} from "../components/PostPreview";
import {Loading} from "../components/Loading";

export function Home() {
    const [isLoading, setLoading] = useState(true)
    const [users, setUsers] = useState<Map<number, User>>(new Map())
    const [commentCount, setCommentCount] = useState<Map<number, number>>(new Map())
    const [articles, setArticles] = useState<Article[]>([])
    const [err, setErr] = useState<Error | undefined>(undefined)

    useEffect(() => {
        Promise.all([findUsers(), findArticles(), findComments()])
            .then(([users, articles, comments]) => {
                setUsers(new Map(users.map(it => [it.id, it])))
                setArticles(articles)

                const counts = new Map<number, number>()
                for (const {postId} of comments) {
                    counts.set(postId, (counts.get(postId) || 0) + 1)
                }
                setCommentCount(counts)
            })
            .catch(e => setErr(e))
            .finally(() => setLoading(false))
    }, [])

    return <div className={"container mx-auto flex flex-col gap-5 max-w-7xl"}>
        {isLoading && <Loading />}
        {err && <ErrorComponent err={err}/>}
        {articles.map(it =>
            <PostPreview key={it.id}
                         articleId={it.id}
                         commentCount={commentCount.get(it.id) || 0}
                         title={it.title}
                         body={it.body}
                         author={users.get(it.userId)?.name || 'Unknown'}/>)}
    </div>
}