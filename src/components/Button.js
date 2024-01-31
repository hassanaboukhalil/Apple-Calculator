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
        styles.borderRadius = "40px"
        styles.display = "flex"
        styles.alignItems = "center"
        styles.flexGrow = "2"
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
        let v1, v2
        if(calc.value1turn){
            if(calc.value1 === "-0"){
                v1 = -(nb)
            }
            else if(calc.value1.length === 9){
                v1 = calc.value1
            }
            else{
                if(calc.value1 === ""){
                    toggle_AC_C("C")
                }
                v1 = calc.value1 + nb
            }
            setCalc({
                ...calc,
                value1: v1,
                output: v1
            })
        }
        else{
            if(calc.value2 === "-0"){
                v2 = -(nb)
            }
            else if(calc.value2 === "0"){
                v2 = nb
            }
            else if(calc.value2.length === 9){
                v2 = calc.value2
            }
            else{
                if(calc.value2 === ''){
                    toggleOperatorBtnActivity("off")
                    toggle_AC_C("C")
                }
                v2 = calc.value2 + nb
            }
            setCalc({
                ...calc,
                value2: v2,
                output: v2
            })
        }
    }

    function dot_clicked(){
        let v1 = calc.value1, v2 = calc.value2 , otpt = calc.output
        if(!(String(calc.value1).includes(".")) && calc.value1turn){
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
        }
        else if(!(String(calc.value2).includes(".")) && !calc.value1turn){

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

            toggleOperatorBtnActivity("off")
        }
        setCalc({
            ...calc,
            value1: v1,
            value2: v2,
            output: otpt
        })
    }

    function operator_clicked(op){
        if(calc.operator !== ""){
            toggleOperatorBtnActivity("off")
        }
        toggleOperatorBtnActivity("on",op)
        if(calc.value2 !== ""){
            equal()
        }
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
        let total, v1, v2;
        if(calc.value1 === "Error"){
            total = "Error"
        }
        else if(calc.value2 === "" && !isOperatorBtnActive()){
            total = Number(calc.value1)
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

        if(String(total).includes(".") && String(total).length > 10){
            let before_pnt = String(total).split(".")[0]
            let nb = 9 - before_pnt.length;
            nb = nb < 0 ? nb*-1 : nb;
            total = Number(Number(total).toFixed(nb))
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

    }

    function AC_C_clicked(){
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
            let v1 , otpt
            if(calc.value1 === '' && calc.output === '0'){
                v1 = ''
                otpt = "0"
            }
            else{
                v1 = String(Number(calc.output)/100)
                otpt = v1
            }
            setCalc({
                ...calc,
                value1: v1,
                output: otpt,
            })
        }
        else{
            if(isOperatorBtnActive()){
                setCalc({
                    ...calc,
                    value2: "0",
                    output: "0"
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
                v2 = "-0"
                total = "-0"
                toggleOperatorBtnActivity("off")
            }
            else{
                v2 = calc.value2 * -1
                total = calc.value2 * -1
            }
            setCalc({
                ...calc,
                value2: v2,
                output: total
            })
        }
    }

    function isOperatorBtnActive(){
        if(calc.operator !== "" && calc.value2 === ""){
            return true
        }
        return false
    }

    function toggleOperatorBtnActivity(toggle, op = calc.operator){
        if(op !== ''){
            if(toggle === "on"){
                document.getElementById(op).style.color = "#FF9500"
                document.getElementById(op).style.backgroundColor = "white"
            }
            else{
                document.getElementById(op).style.color = "white"
                document.getElementById(op).style.backgroundColor = "#FF9500"
            }
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
            {btn_obj.innertext === "0" ? (<span className="btn-zero">{btn_obj.innertext}</span>) : ""}
        </button>
    )
}

export default Button;