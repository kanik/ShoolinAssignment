import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { LoadingIndicator } from './Loading'
import { useFetch } from '../api/index'
import { PostBody } from './PostBody'
import { Button } from "./Button"

interface Props {
    user: {
        name: string;
        id: number;
    }
}

interface Post {
    id: number;
    title: string;
    body: string;
}

const Container = styled.div`   
    margin: 50px;
`

export function PostsContainer({ user }: Props) {
    const [showAll, setShowAll] = useState(false)
    const { loading, data, error } = useFetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)

    useEffect(() => {
        setShowAll(false)
    }, [user])

    if (loading) return <LoadingIndicator size="small"/>
    if (error) return <p>Error</p>
    if (!data) return <p>No posts found for {user.name}</p>

    const postsToShow = showAll ? data : data.slice(0,3)

    return <Container>
        <h2>Posts from {user.name}:</h2>
        <div data-testid="post-container">
            {postsToShow.map((post: Post) => <PostBody key={post.id} {...post} />)}
        </div>
        {!showAll && <Button data-testid="show_all_posts" onClick={() => setShowAll(true)}>...Load all</Button>}
    </Container>
}