
// const row1_btns = [
//     {
//         name: "c",
//         innertext: "C"
//     },
//     {
//         name: "plus_minus",
//         innertext: "not found",
//         image_src: ""
//     }
// ]

import RowBtns from "./RowBtns"

const ButtonsPart = () => {

    return (
        <div className="ButtonsPart">
            <RowBtns />
            <RowBtns />
            <RowBtns />
            <RowBtns />
            <RowBtns />
        </div>
    )
}

export default ButtonsPart