import { createContext, useContext, useState } from "react"

const ValuesContext = createContext(undefined)

export function ValuesProvider ({children}){
    const [value1, setValue1] = useState("")
    const [value2, setValue2] = useState("")
    const [output, setOutput] = useState("0")
    // const [operatorClicked , setOperatorClicked] = useState(false)
    return (
        <ValuesContext.Provider value={{
            value1: value1,
            value2: value2,
            output: output,
            // operatorClicked: operatorClicked,
            setValue1: (value) => {setValue1(value)},
            setValue2: (value) => {setValue2(value)},
            setOutput: (value) => {setOutput(value)},
            // setOperatorClicked: () => {operatorClicked ? }
        }}>
            {children}
        </ValuesContext.Provider>
    )
}

export const useValues = () => useContext(ValuesContext)