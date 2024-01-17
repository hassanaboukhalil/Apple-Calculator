import { createContext, useContext, useState } from "react"

const ValuesContext = createContext()

export function ValuesProvider ({children}){

    const [calc, setCalc] = useState({
        value1: "",
        value2: "",
        output: "0",
        operator: "",
        value1turn: true
    })


    return (
        <ValuesContext.Provider value={{
            calc,
            setCalc
        }}>
            {children}
        </ValuesContext.Provider>
    )
}

export const useValues = () => useContext(ValuesContext)
