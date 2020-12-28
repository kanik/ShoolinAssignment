import {useFetch} from '../api/index'
import {LoadingIndicator} from './Loading'

interface Props {
    postId: number;
    title: string;
}

export function CommentsContainer({postId, title}: Props) {
    const {loading, data, error} = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)

    if (loading) return <LoadingIndicator size="small" />
    if (error) return <p>Error</p>
    if (!data) return <p>No comments found for {title}</p>

    return <ul data-testid="comments-container-data">
        {data.map((comment: {id: number, name: string, body: string}) => {
            return <li key={comment.id}>
                <p>{comment.name}</p>
                <p>{comment.body}</p>
            </li>
        })}
    </ul>
}