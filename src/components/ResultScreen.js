import { Textfit } from "react-textfit"
import { useValues } from "../context/valuesContext"

const ResultScreen = () => {

    let { calc } = useValues()

    function addCommas(nb){
        if(Number(nb) > 999){
            nb = String(nb)
            let nb_with_commas = ""
            let nb_without_fraction_part = nb
            if(nb.includes('.')){
                nb_without_fraction_part = nb.slice(0, nb.indexOf('.'))
            }
            for(let i = nb_without_fraction_part.length - 1 - 3 ; i > -1 ; i = i - 3){
                nb_with_commas = ',' + nb.slice(i+1 , i+4) + nb_with_commas
                if(i - 3 < 0){
                    nb_with_commas = nb.slice(0, i+1) +  nb_with_commas
                }
            }

            if(nb.includes('.')){
                nb_with_commas = nb_with_commas + nb.slice(nb.indexOf('.'), nb.length)
            }

            return nb_with_commas
        }
        return nb
    }

    function formatLargeNumber(result){
        let res = Number(result)
        if(String(res).length > 10){
            res = res.toExponential(5)
        }
        else{
            res = res.toExponential(6)
        }

        let [nb, exp] = res.split("e")
        nb = Number(nb)
        res = `${nb}e${exp}`

        res = res.replace("+",'')

        return res
    }

    return (
        <div className="ResultScreen">
            <Textfit className="result" min={40} max={window.matchMedia("(min-width: 992px)").matches ? 63 : 100} mode="single" style={{width:"100%"}}>
                <p data-testid="result">
                    {Number(calc.output) >= 1000000000 ? formatLargeNumber(calc.output) : addCommas(calc.output)}
                </p>
            </Textfit>
        </div>
    )
}

export default ResultScreen