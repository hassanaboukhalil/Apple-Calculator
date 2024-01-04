import { createContext, useContext, useState } from "react"

const ValuesContext = createContext(undefined)

// let value1 = ""
// let value2 = ""
// let setValue1 = (value) => value1 = value
// let setValue2 = (value) => value2 = value


export function ValuesProvider ({children}){
    //// const [value1, setValue1] = useState("")
    //// const [value2, setValue2] = useState("")
    // const [output, setOutput] = useState("0")
    // const [operator , setOperator] = useState("")
    // const [value1turn, setValue1turn] = useState(true)

    const [calc, setCalc] = useState({
        value1: "",
        value2: "",
        output: "0",
        operator: "",
        value1turn: true
    })


    return (
        <ValuesContext.Provider value={{
            // value1,
            // value2,
            // output,
            // operator,
            // value1turn,
            // setValue1,
            // setValue2,
            // setOutput,
            // setOperator,
            // setValue1turn
            calc,
            setCalc
        }}>
            {children}
        </ValuesContext.Provider>
    )
}

export const useValues = () => useContext(ValuesContext)


/* <ValuesContext.Provider value={{
        value1,
        value2,
        output,
        operator,
        value1turn,
        setValue1,
        setValue2,
        setOutput,
        setOperator,
        setValue1turn
    }}>
        {children}
    </ValuesContext.Provider> */
