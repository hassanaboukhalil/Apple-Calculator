import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useValues } from "../context/valuesContext";

const Button = ({btn_obj}) => {

    let {calc, setCalc} = useValues()

    let styles = {
        backgroundColor: btn_obj.bg,
        color: btn_obj.color,
        fontSize: btn_obj.fontSize
    }

    if(btn_obj.type === "none"){
        styles.display = "none"
    }

    if(btn_obj.innertext === "0"){
        styles.width = "188px"
        styles.borderRadius = "40px"
        styles.display = "flex"
        styles.alignItems = "center"
    }


    function btn_clicked(){
        if("0123456789".includes(btn_obj.innertext)){
            nb_clicked(btn_obj.innertext)
        }
        else if(".".includes(btn_obj.innertext)){
            dot_clicked()
        }
        else if(btn_obj.type === "fontawsome"){
            if("plus-minus-multiply-divide".includes(btn_obj.id)){
                operator_clicked(btn_obj.id)
            }
            else{
                equal()
            }
        }
        else if("AC".includes(btn_obj.innertext)){
            AC_C_clicked(btn_obj.innertext)
        }
        else if("%".includes(btn_obj.innertext)){
            percent_clicked()
        }
        else {
            plus_minus()
        }
    }

    function nb_clicked(nb){
        let v1, v2, otpt
        if(calc.value1turn){
            if(calc.value1 === ""){
                toggle_AC_C("C")
            }
            if(calc.value1 === "-0"){
                v1 = -(nb)
                otpt = -(nb)
            }
            else{
                v1 = calc.value1 + nb
                otpt = calc.value1 + nb
            }
            setCalc({
                ...calc,
                value1: v1,
                output: otpt
            })
        }
        else{
            if(calc.value2 === ''){
                toggleOperatorBtnActivity("off")
                toggle_AC_C("C")
            }
            if(calc.value2 === "-0"){
                v2 = -(nb)
                otpt = -(nb)
            }
            else{
                v2 = calc.value2 + nb
                otpt = calc.value2 + nb
            }
            setCalc({
                ...calc,
                value2: v2,
                output: otpt
            })
        }
    }

    function dot_clicked(){
        let v1, v2 , otpt
        if(!(String(calc.value1)).includes(".") && calc.value1turn){
            // let v1, v2 , otpt
            if(calc.value1 === "" && calc.value2 === ""){
                v1 = "0."
                otpt = "0."
                v2 = ''
            }
            else{
                v1 = calc.value1 + "."
                otpt = calc.value1 + "."
                v2 = ''
            }
            // else if(!calc.value1turn && calc.value2 === ''){
            //     v1 = calc.value1
            //     v2 = "0."
            //     otpt = "0."
            //     toggleOperatorBtnActivity("off")
            // }
            // else{
            //     v1 = calc.value1
            //     v2 = calc.value2 + "."
            //     otpt = calc.value2 + "."
            // }
            setCalc({
                ...calc,
                value1: v1,
                value2: v2,
                output: otpt
            })
        }
        else if(!(String(calc.value2)).includes(".") ){

            if(calc.value2 !== ''){
                v1 = calc.value1
                v2 = calc.value2 + "."
                otpt = calc.value2 + "."
            }
            else{
                v2 = "0."
                otpt = "0."
                v1 = calc.value1
            }

            // v1 = calc.value1
            // v2 = "0."
            // otpt = "0."
            toggleOperatorBtnActivity("off")
            setCalc({
                ...calc,
                value1: v1,
                value2: v2,
                output: otpt
            })
        }
    }

    function operator_clicked(op){ //* plus minus
        /**
         * # first time
         * *  ""  !== "plus" --> true
         *      &&
         * *  ""  !== ""     --> false
         *
         * ! --> false
         */
        /**
         * # second time
         * *  "plus"  !== "minus" --> true
         *      &&
         * *  "plus"  !== ""     -->  true
         *
         * ! --> true
         */
        if(calc.operator !== ""){
            toggleOperatorBtnActivity("off")
        }
        // if(calc.value1 && calc.value2 && calc.output === "0"){
        //     setCalc({
        //         ...calc,
        //         value1: calc.output,
        //     })
        // }
        toggleOperatorBtnActivity("on",op)
        if(calc.value2 !== ""){
            equal() // output = 30
            // setOutput(output)
            // setValue1(output)
            // // setOutput("")
            // setValue2("")
            // setValue1turn(false)

            // setCalc({
            //     ...calc,
            //     value1: calc.output,
            // })
        }
        
        // setCalc({
        //     ...calc,
        //     // value2: "",
        //     operator: op,
        //     // value1: calc.output,
        //     value1turn: false
        // })
        setCalc(prevState => {
            const updatedObject = {
                ...prevState,
                operator: op,
                value1: prevState.output,
                value1turn: false
            }
            return updatedObject;
        });
    }

    function equal(){
        /**
             ** value1 = 10
             *? operator = +
             ** value2 = 15
             *! equal()
             ** output = 15
             ** value1 = ""
             *? operator = ""
             ** value2 = ""
             ** value1turn = true
        */

        let total, v1, v2;
        if(calc.value1 === "Error"){
            total = "Error"
        }
        else if(calc.value2 === "" && !isOperatorBtnActive()){
            // setCalc(prevState => {
            //     const updatedObject = {
            //         ...prevState,
            //         output: calc.value1,
            //         value1: "",
            //         value2: "",
            //         operator: "",
            //         value1turn: true
            //     }
            //     return updatedObject;
            // });
            total = calc.value1
        }
        else{
            if(calc.value2 === "" && isOperatorBtnActive()){
                v1 = calc.value1
                v2 = calc.value1
            }
            else{
                v1 = calc.value1
                v2 = calc.value2
            }
            if(calc.operator === "plus") total = Number(v1) + Number(v2)
            else if(calc.operator === "minus") total = Number(v1) - Number(v2)
            else if(calc.operator === "multiply") total = Number(v1) * Number(v2)
            else{
                if(v2 === "0"){
                    total = "Error"
                }
                else{
                    total = Number(v1)/Number(v2)
                }
            }
        }

        if(isOperatorBtnActive()){
            toggleOperatorBtnActivity("off")
        }

        setCalc(prevState => {
            const updatedObject = {
                ...prevState,
                output: total,
                value1: "",
                value2: "",
                operator: "",
                value1turn: true
            }
            return updatedObject;
        });

        //// if(operator !== ""){
        ////     document.getElementById(operator).style.color = "white"
        ////     document.getElementById(operator).style.backgroundColor = "#FF9500"
        //// }

    }

    function AC_C_clicked(AC_C){
        // setCalc({
        //     ...calc,
        //     value1: "",
        //     value2: "",
        //     operator: "",
        //     output: "0"
        // })
        if(calc.operator !== ""){
            document.getElementById(calc.operator).style.color = "white"
            document.getElementById(calc.operator).style.backgroundColor = "#FF9500"
        }
        if(document.getElementById("AC_C").innerHTML === "C"){
            if(calc.value2 === "" && isOperatorBtnActive()){
                setCalc({
                    ...calc,
                    output: "0"
                })
                toggleOperatorBtnActivity("on")
            }
            else if(calc.value2 !== ""){
                setCalc({
                    ...calc,
                    value2: "",
                    output: "0"
                })
                toggleOperatorBtnActivity("on")
            }
            else{
                setCalc({
                    ...calc,
                    value1: "",
                    output: "0"
                })
            }
        }
        else{
            setCalc({
                ...calc,
                value1: "",
                value2: "",
                operator: "",
                output: "0",
                value1turn: true
            })
        }
        toggle_AC_C("AC")
    }

    function percent_clicked(){
        if(calc.value1turn){
            setCalc({
                ...calc,
                value1: String(Number(calc.value1)/100),
                output: String(Number(calc.value1)/100),
            })
        }
        else{
            if(isOperatorBtnActive()){
                setCalc({
                    ...calc,
                    value2: 0,
                    output: 0
                })
                toggleOperatorBtnActivity("off")
            }
            else{
                setCalc({
                    ...calc,
                    value2: String(Number(calc.value2)/100),
                    output: String(Number(calc.value2)/100)
                })
            }
        }
    }

    function plus_minus(){
        // setOutput(Number(output) * -1 + "")
        let v1, v2, total
        if(calc.value1turn){
            if(calc.value1 === ''){
                v1 = '-0'
                total = '-0'
            }
            else{
                v1 = calc.value1 * -1
                total = calc.value1 * -1
            }
            setCalc({
                ...calc,
                value1: v1,
                output: total
            })
        }
        else{
            if(isOperatorBtnActive()){
                setCalc({
                    ...calc,
                    value2: "-0",
                    output: "-0"
                })
                toggleOperatorBtnActivity("off")
            }
            else{
                setCalc({
                    ...calc,
                    value2: calc.value2 * -1,
                    output: calc.value2 * -1
                })
            }
        }
    }

    function isOperatorBtnActive(){
        if(calc.operator !== "" && calc.value2 === ""){
            return true
        }
        return false
    }

    function toggleOperatorBtnActivity(toggle, op = calc.operator){
        /*
            * @param {string} toggle can be "on" or "off"
        */
        /*
            - calc.operator = +
            - calc.value2 = ''

            -->
                - operator color = white
                - operator backgroundColor = "#FF9500"
        */
        // if(calc.operator !== "" && calc.value2 === ""){
        //     document.getElementById(calc.operator).style.color = "white"
        //     document.getElementById(calc.operator).style.backgroundColor = "#FF9500"
        // }
        // else{
        //     document.getElementById(calc.operator).style.color = "#FF9500"
        //     document.getElementById(calc.operator).style.backgroundColor = "white"
        // }
        // if(calc.operator !== ""){
        //     if(toggle === "on"){
        //         document.getElementById(calc.operator).style.color = "#FF9500"
        //         document.getElementById(calc.operator).style.backgroundColor = "white"
        //     }
        //     else{
        //         document.getElementById(calc.operator).style.color = "white"
        //         document.getElementById(calc.operator).style.backgroundColor = "#FF9500"
        //     }
        // }
        if(toggle === "on"){
            document.getElementById(op).style.color = "#FF9500"
            document.getElementById(op).style.backgroundColor = "white"
        }
        else{
            document.getElementById(op).style.color = "white"
            document.getElementById(op).style.backgroundColor = "#FF9500"
        }
    }

    function toggle_AC_C(AC_C){
        document.getElementById("AC_C").innerHTML = AC_C
    }

    return (
        <button className="Button" style={styles} onClick={btn_clicked} id={btn_obj.id ? btn_obj.id : ""}>
            {btn_obj.type === "text" ? (btn_obj.innertext) : ""}
            {btn_obj.type === "number" && btn_obj.innertext !== "0" ? (btn_obj.innertext) : ""}
            {btn_obj.type === "svg" ? (<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.2083 13.9861H13.9023V18.6501H18.4563V20.1241H13.9023V24.7881H12.2083V20.1241H7.6543V18.6501H12.2083V13.9861Z" fill="black"/><path d="M12.7806 37.3862L28.06 14.0599L29.9769 14.4852L14.633 37.7971L12.7806 37.3862Z" fill="black"/><path d="M23.6183 35.9901V33.9701H34.3183V35.9901H23.6183Z" fill="black"/></svg>) : ""}
            {btn_obj.type === "fontawsome" ? (<FontAwesomeIcon icon={btn_obj.icon} size="2x" />) : ""}
            {btn_obj.innertext === "0" ? (<span style={{paddingLeft: "27px"}}>{btn_obj.innertext}</span>) : ""}
        </button>
    )
}

export default Button;