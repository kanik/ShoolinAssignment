import { render, screen, act} from '@testing-library/react'
import moxios from 'moxios'

import { CommentsContainer } from '../components/CommentsContainer'

import commentsData from './apiData/commentsData.json'

describe("Comments Container", () => {
    beforeEach(() =>{
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it("should render the loading indicator", async () => {
        render(<CommentsContainer postId={1} title="Test" />)
        expect(screen.getByTestId("loading-indicator")).toBeTruthy();
    })
    it("should render the error indicator", async () => {
        render(<CommentsContainer postId={1} title="Test" />)

        moxios.stubRequest(`https://jsonplaceholder.typicode.com/posts/1/comments`, {
            status: 400,
        })
        expect(screen.getByTestId("loading-indicator")).toBeTruthy();

        await act(() => Promise.resolve())

        screen.getByText("Error")
    })
    it("should render the no data indicator", async () => {
        const title = "Title"
        render(<CommentsContainer postId={1} title={title} />)

        moxios.stubRequest(`https://jsonplaceholder.typicode.com/posts/1/comments`, {
            status: 200,
        })
        expect(screen.getByTestId("loading-indicator")).toBeTruthy();

        await act(() => Promise.resolve())

        screen.getByText(`No comments found for ${title}`)
    })
    it("should render the component with the data", async () => {
        const title = "Title"
        render(<CommentsContainer postId={1} title={title} />)

        moxios.stubRequest(`https://jsonplaceholder.typicode.com/posts/1/comments`, {
            status: 200,
            response: commentsData,
        })
        expect(screen.getByTestId("loading-indicator")).toBeTruthy();

        await act(() => Promise.resolve())

        expect(screen.getByTestId("comments-container-data")).toBeTruthy()
    })
})