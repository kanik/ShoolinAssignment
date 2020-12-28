import {screen, render, fireEvent} from '@testing-library/react'
import { PostBody } from '../components/PostBody'

describe("Post Body", () => {
    it("should render the Post Body component", () => {
        const title = "Test Post Title"
        const body = "Test Post Body"
        const id = 1
        
        render(<PostBody {...{title, body, id}} />)
        expect(screen.getByText(`Title: ${title}`)).toBeTruthy();
        expect(screen.getByText(`Body: ${body}`)).toBeTruthy();
        expect(screen.getByTestId("postbody_plus")).toBeTruthy()
    })
    it("should render the comments container when the plus is clicked", () => {
        const title = "Test Post Title"
        const body = "Test Post Body"
        const id = 1
        
        render(<PostBody {...{title, body, id}} />)
        fireEvent.click(screen.getByTestId("postbody_plus"))
        expect(screen.getByTestId("comments_header")).toBeTruthy();
    })
})