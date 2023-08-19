import { useState, useEffect } from "react"

function Select({options, updateOrderValue}) {
    const [value, setValue] = useState("")
    
    return (
        <select className='w-24' onChange={(e) => updateOrderValue(e.target.value)}>
            <option value="" readOnly>Sort by</option>
            {options && options.map((option, index) => {
                return(
                    <option key={index} value={option.value}>{option.name}</option>
                )
            })}
        </select>
    )
}
export default Select