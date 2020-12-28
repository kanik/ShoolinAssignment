import {useState} from 'react'
import styled from 'styled-components'

import { CommentsContainer } from './CommentsContainer'

interface Props {
    id: number;
    title: string;
    body: string;
}

const PostBodyContainer = styled.div`
    position: relative;
    border: 2px solid #303F9F;
    color: white;
    background-color: #03A9F4;
    padding: 10px 20px;
    margin-bottom: 20px;
    max-width: 800px;   
`

const Plus = styled.div`
    position: absolute;
    content: " ";
    top: 40px;
    right: -50px;
    height: 50px;
    width: 15px;
    background-color: #03A9F4;

    &::before {
        content: " ";
        height: 50px;
        width: 15px;
        display: block;
        background-color: #03A9F4;
        transform: rotate(90deg);
    }

    &:hover {
        cursor: pointer;
    }

`

export function PostBody({ title, body, id }: Props) {
    const [showComments, setShowComments] = useState<boolean>(false)

    return  (
        <PostBodyContainer>
            <p>Title: {title}</p>
            <p>Body: {body}</p>
            <Plus data-testid="postbody_plus" onClick={() => setShowComments((prevState) => !prevState)} />
            {showComments && 
                <>
                    <h3 data-testid="comments_header">Comments</h3>
                    <CommentsContainer postId={id} title={title}/>
                </>
            }
        </PostBodyContainer>
    )
}