import {screen, render} from '@testing-library/react'
import { Button } from '../components/Button'

describe("Button", () => {
    it("should render the button component", () => {
        const text = "Click Me"
        render(<Button>{text}</Button>)
        expect(screen.getByText(text)).toBeTruthy()
    })
})