import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useValues } from "../context/valuesContext";
import { useEffect } from "react";
// import { useState } from "react";

// let value1turn;
// let setValue1turn = (bool) => value1turn = bool;

// let op_element =

let v1 = ""

const Button = ({btn_obj}) => {

    let { value1, setValue1, value2, setValue2, operator, setOperator, output, setOutput, value1turn, setValue1turn} = useValues()

    //// const [value1, setValue1] = useState("")
    //// const [value2, setValue2] = useState("")
    //// const [operator , setOperator] = useState("")
    //// const [value1turn, setValue1turn] = useState(true)

    v1 = value1

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
            dot_clicked(btn_obj.innertext)
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
        if(value1turn){
            // setOutput(value1 + nb)
            // setValue1(value1 + nb)

            if(output === "0"){
                v1 = v1 + nb
                setValue1(v1)
                // value1 = value1 + nb
                setOutput(v1)
                // setValue1(nb)
            }
            else{
                v1 = v1 + nb
                setValue1(v1)
                // value1 = value1 + nb
                setOutput(v1)

                // value1 = value1 + nb
                // setValue1(nb)
                // setOutput(value1)
            }
            // setValue1(value1 + nb)
        }
        else{
            document.getElementById(operator).style.color = "white"
            document.getElementById(operator).style.backgroundColor = "#FF9500"
            setOutput(value2 + nb)
            // setValue2(value2 + nb)
            setValue2(output)

            // setValue2(value2 + nb)
            // setOutput(value2)
        }
    }


    // useEffect(() => { 
    //     console.log(value1)
    // }, [value1]);



    function dot_clicked(dot){
        if(!output.includes(".")){
            if(operator === ""){
                setValue1(value1 + dot)
                setOutput(value1)
            }
            else{
                setValue2(value2 + dot)
                setOutput(value2)
            }
        }
    }

    function operator_clicked(op){ //* plus minus
        /**
         * ? first time
         * *  ""  !== "plus" --> true
         *      &&
         * *  ""  !== ""     --> false
         *
         * ! --> false
         */
        /**
         * ? second time
         * *  "plus"  !== "minus" --> true
         *      &&
         * *  "plus"  !== ""     -->  true
         *
         * ! --> true
         */
        if(operator !== ""){
            document.getElementById(operator).style.color = "white"
            document.getElementById(operator).style.backgroundColor = "#FF9500"
        }
        if(value2 !== ""){
            equal() // output = 30
            // setOutput(output)
            setValue1(output)
            // setOutput("")
            setValue2("")
            // setValue1turn(false)
        }
        setOperator(op)
        setValue1turn(false)
        document.getElementById(op).style.color = "#FF9500"
        document.getElementById(op).style.backgroundColor = "white"
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

        let total;
        if(value1 === "Error"){
            total = "Error"
        }
        else{
            if(operator === "plus") total = Number(value1) + Number(value2)
            else if(operator === "minus") total = Number(value1) - Number(value2)
            else if(operator === "multiplay") total = Number(value1) * Number(value2)
            else{
                if(value2 === "0"){
                    total = "Error"
                }
                else{
                    total = Number(value1)/Number(value2)
                }
            }
        }
        // if(operator !== ""){
        //     document.getElementById(operator).style.color = "white"
        //     document.getElementById(operator).style.backgroundColor = "#FF9500"
        // }
        setOutput(total)
        setValue1("")
        setOperator("")
        setValue2("")
        setValue1turn(true)
    }

    function AC_C_clicked(AC_C){
        setValue1("")
        setOperator("")
        setValue2("")
        setOutput("0")
        if(operator !== ""){
            document.getElementById(operator).style.color = "white" //
            document.getElementById(operator).style.backgroundColor = "#FF9500"
        }
    }

    function percent_clicked(){

    }

    function plus_minus(){
        setOutput(Number(output) * -1 + "")
    }


    // useEffect(()=>{
    //     // setOutput(value1)
    //     setValue1(value1)
    // },[value1,setValue1])


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