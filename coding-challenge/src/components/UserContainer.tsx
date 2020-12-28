import { useState } from 'react'
import styled from 'styled-components'

import { useFetch } from "../api/index"
import { LoadingIndicator } from './Loading'
import { Button } from './Button'
import { PostsContainer } from './PostsContainer'

interface User {
    id: number
    name: string
}

const ButtonContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    column-gap: 3px;
    margin-top: 10px;
`

const H1 = styled.h1`
    margin: 50px;
`

export function UserContainer() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { loading, data, error } = useFetch(`https://jsonplaceholder.typicode.com/users`)

    if (loading) return <LoadingIndicator size="medium"/>
    if (error) return <p>Error</p>
    if (!data) return <p>No user data</p>

    return <>
        <H1>Please select a user to find their comments</H1>
        <ButtonContainer>
            {data.map((user: User) => (<Button key={user.id} selected={user.id === selectedUser?.id} onClick={() => setSelectedUser(user)}>{user.name}</Button>))}
        </ButtonContainer>
        {selectedUser && <PostsContainer user={selectedUser} />}
    </>

}