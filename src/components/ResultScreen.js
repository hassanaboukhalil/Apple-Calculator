import { useValues } from "../context/valuesContext"

const ResultScreen = () => {

    let { output } = useValues()

    return (
        <div className="ResultScreen">
            <p className="result">{output}</p>
        </div>
    )
}

export default ResultScreen