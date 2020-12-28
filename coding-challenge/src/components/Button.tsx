import styled from 'styled-components'

export const Button = styled.button`
    border: 2px solid #303F9F;
    color: white;
    background-color: #03A9F4;
    padding: 10px 20px;
    ${(props: {selected?: boolean }) => props.selected && `background-color: orange`}
`