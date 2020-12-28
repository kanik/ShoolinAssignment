import { render, screen, act} from '@testing-library/react'
import moxios from 'moxios'

import { UserContainer } from '../components/UserContainer'

import userData from './apiData/userData.json'

describe("Comments Container", () => {
    beforeEach(() =>{
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it("should render the loading indicator", async () => {
        render(<UserContainer />)
        expect(screen.getByTestId("loading-indicator")).toBeTruthy();
    })
    it("should render the error indicator", async () => {
        render(<UserContainer />)

        moxios.stubRequest(`https://jsonplaceholder.typicode.com/users`, {
            status: 400,
        })
        expect(screen.getByTestId("loading-indicator")).toBeTruthy();

        await act(() => Promise.resolve())

        screen.getByText("Error")
    })
    it("should render the no data indicator", async () => {
        render(<UserContainer />)

        moxios.stubRequest(`https://jsonplaceholder.typicode.com/users`, {
            status: 200,
        })
        expect(screen.getByTestId("loading-indicator")).toBeTruthy();

        await act(() => Promise.resolve())

        screen.getByText(`No user data`)
    })
    it("should render the component with the data", async () => {
        render(<UserContainer />)

        moxios.stubRequest(`https://jsonplaceholder.typicode.com/users`, {
            status: 200,
            response: userData,
        })
        expect(screen.getByTestId("loading-indicator")).toBeTruthy();

        await act(() => Promise.resolve())

        expect(screen.getByText("Please select a user to find their comments")).toBeTruthy()
    })
})