import React from 'react'
import Button from './Button'
import { faDivide, faXmark, faMinus, faPlus, faEquals  } from '@fortawesome/free-solid-svg-icons'

const row1_btns = [
    {
      type: "text",
      innertext: "AC",
      bg: "#D4D4D2",
      color: "black",
      fontSize: "38px"
    },
    {
      type: "svg",
      bg: "#D4D4D2",
      color: "black",
      fontSize: "unset"
    },
    {
      type: "text",
      innertext: "%",
      bg: "#D4D4D2",
      color: "black",
      fontSize: "42px"
    },
    {
      type: "fontawsome",
      icon: faDivide,
      bg: "#FF9500",
      color: "white",
      fontSize: "unset",
      id: "divide",
      operator: "/"
    }
]

const row2_btns = [
  {
    type: "number",
    innertext: "7",
    bg: "#505050",
    color: "white",
    fontSize: "44px" // 57px
  },
  {
    type: "number",
    innertext: "8",
    bg: "#505050",
    color: "white",
    fontSize: "44px"
  },
  {
    type: "number",
    innertext: "9",
    bg: "#505050",
    color: "white",
    fontSize: "44px"
  },
  {
    type: "fontawsome",
    icon: faXmark,
    bg: "#FF9500",
    color: "white",
    fontSize: "unset",
    id: "multiply",
    operator: "*"
  }
]

const row3_btns = [
  {
    type: "number",
    innertext: "4",
    bg: "#505050",
    color: "white",
    fontSize: "44px"
  },
  {
    type: "number",
    innertext: "5",
    bg: "#505050",
    color: "white",
    fontSize: "44px"
  },
  {
    type: "number",
    innertext: "6",
    bg: "#505050",
    color: "white",
    fontSize: "44px"
  },
  {
    type: "fontawsome",
    icon: faMinus,
    bg: "#FF9500",
    color: "white",
    fontSize: "unset",
    id: "minus"
  }
]

const row4_btns = [
  {
    type: "number",
    innertext: "1",
    bg: "#505050",
    color: "white",
    fontSize: "44px"
  },
  {
    type: "number",
    innertext: "2",
    bg: "#505050",
    color: "white",
    fontSize: "44px"
  },
  {
    type: "number",
    innertext: "3",
    bg: "#505050",
    color: "white",
    fontSize: "44px"
  },
  {
    type: "fontawsome",
    icon: faPlus,
    bg: "#FF9500",
    color: "white",
    fontSize: "unset",
    id: "plus"
  }
]

const row5_btns = [
  {
    type: "none",
    innertext: "1",
    bg: "#505050",
    color: "white",
    fontSize: "44px"
  },
  {
    type: "number",
    innertext: "0",
    bg: "#505050",
    color: "white",
    fontSize: "44px"
  },
  {
    type: "text",
    innertext: ".",
    bg: "#505050",
    color: "white",
    fontSize: "57px"
  },
  {
    type: "fontawsome",
    icon: faEquals,
    bg: "#FF9500",
    color: "white",
    fontSize: "unset"
  }
]

export default function RowBtns(props) {
  const row_nb = props.row_nb
  let btns;
  if(row_nb === "1"){
    btns = [...row1_btns]
  }
  else if(row_nb === "2"){
    btns = [...row2_btns]
  }
  else if(row_nb === "3"){
    btns = [...row3_btns]
  }
  else if(row_nb === "4"){
    btns = [...row4_btns]
  }
  else {
    btns = [...row5_btns]
  }

  return (
    <div className='row-btns'>
      <Button btn_obj={btns[0]} />
      <Button btn_obj={btns[1]} />
      <Button btn_obj={btns[2]} />
      <Button btn_obj={btns[3]} />
    </div>
  )
}
