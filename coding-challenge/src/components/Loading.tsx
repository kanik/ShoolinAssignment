import styled from 'styled-components'

interface Props {
    size: "small" | "medium" | "large"
}

const Loading = styled.div`
    border-radius: 50%;
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% {transform: rotate(0deg)}
        100% { transform: rotate(360deg)}
    }

    ${({size }: Props) => {
        switch(size) {
            case "small":default: {
                return `
                    width: 120px;
                    height: 120px;
                `
            };
            case "medium": {
                return `
                    width: 90px;
                    height: 90px;
                `
            }
            case "large": {
                return `
                    width: 120px;
                    height: 120px;
                `
            }
        }
    }}
`

export function LoadingIndicator({size}: Props) {
    return <Loading data-testid="loading-indicator" size={size}/>
}