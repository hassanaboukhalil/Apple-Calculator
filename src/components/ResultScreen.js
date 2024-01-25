import { Textfit } from "react-textfit"
import { useValues } from "../context/valuesContext"

const ResultScreen = () => {

    let { calc } = useValues()

    return (
        <div className="ResultScreen">
            <Textfit className="result" min={50} mode="single" style={{width:"100%"}}>
                <p data-testid="result">{calc.output}</p>
            </Textfit>
        </div>
    )
}

export default ResultScreen