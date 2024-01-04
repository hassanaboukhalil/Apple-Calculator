import { useValues } from "../context/valuesContext"

const ResultScreen = () => {

    let { calc } = useValues()

    return (
        <div className="ResultScreen">
            <p className="result" id="result" data-testid="result">{calc.output}</p>
        </div>
    )
}
// {calc.output}
export default ResultScreen