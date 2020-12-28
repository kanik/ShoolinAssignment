import {screen, render} from '@testing-library/react'
import { LoadingIndicator } from '../components/Loading'

describe("Button", () => {
    it("should render the button component", () => {
        render(<LoadingIndicator size="small" />)
        expect(screen.getByTestId("loading-indicator")).toBeTruthy()
    })
})