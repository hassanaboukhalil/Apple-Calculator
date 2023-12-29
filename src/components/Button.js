import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useValues } from "../context/valuesContext";

const Button = ({btn_obj}) => {

    let { value1 , value2 , output , setValue1 , setValue2 , setOutput} = useValues()

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
        if("0123456789.".includes(btn_obj.innertext)){
            nb_clicked(btn_obj.innertext)
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
        // if(output === "0"){
        //     setValue1(btn_obj.innertext)
        //     setOutput(btn_obj.innertext)
        // }
        // else{
        //     setValue1(value1 + btn_obj.innertext)
        //     setOutput(value1 + btn_obj.innertext)
        // }
        setValue1(value1 + nb)
        setOutput(value1)
    }

    function operator_clicked(op){

    }

    function equal(){
        
    }

    function AC_C_clicked(AC_C){
        setValue1("")
        setValue2("")
        setOutput("0")
    }

    function percent_clicked(){

    }

    function plus_minus(){
        setOutput(Number(output) * -1 + "")
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