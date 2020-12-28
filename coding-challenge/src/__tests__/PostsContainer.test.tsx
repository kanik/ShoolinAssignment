import { render, screen, act, fireEvent} from '@testing-library/react'
import moxios from 'moxios'

import { PostsContainer } from '../components/PostsContainer'

import postsData from './apiData/postsData.json'

describe("Comments Container", () => {
    beforeEach(() =>{
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it("should render the loading indicator", async () => {
        render(<PostsContainer user={{name: "Steve", id: 1}} />)
        expect(screen.getByTestId("loading-indicator")).toBeTruthy();
    })
    it("should render the error indicator", async () => {
        render(<PostsContainer user={{name: "Steve", id: 1}} />)

        moxios.stubRequest(`https://jsonplaceholder.typicode.com/users/1/posts`, {
            status: 400,
        })
        expect(screen.getByTestId("loading-indicator")).toBeTruthy();

        await act(() => Promise.resolve())

        screen.getByText("Error")
    })
    it("should render the no data indicator", async () => {
        const message = "No posts found for Steve"
        render(<PostsContainer user={{name: "Steve", id: 1}} />)

        moxios.stubRequest(`https://jsonplaceholder.typicode.com/users/1/posts`, {
            status: 200,
        })
        expect(screen.getByTestId("loading-indicator")).toBeTruthy();

        await act(() => Promise.resolve())

        screen.getByText(message)
    })
    it("should render the component with the data", async () => {
        render(<PostsContainer user={{name: "Steve", id: 1}} />)

        moxios.stubRequest(`https://jsonplaceholder.typicode.com/users/1/posts`, {
            status: 200,
            response: postsData,
        })
        expect(screen.getByTestId("loading-indicator")).toBeTruthy();

        await act(() => Promise.resolve())

        expect(screen.getByTestId("post-container")).toBeTruthy()
    })
    it("should render the component with three results showing and then all results", async () => {
        render(<PostsContainer user={{name: "Steve", id: 1}} />)

        moxios.stubRequest(`https://jsonplaceholder.typicode.com/users/1/posts`, {
            status: 200,
            response: postsData,
        })
        expect(screen.getByTestId("loading-indicator")).toBeTruthy();

        await act(() => Promise.resolve())

        expect(screen.getByTestId("post-container").children.length).toBe(3)
        fireEvent.click(screen.getByTestId("show_all_posts"))
        expect(screen.getByTestId("post-container").children.length).toBe(10)
    })
})