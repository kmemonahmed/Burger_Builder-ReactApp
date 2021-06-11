import React from 'react';


const Summary = props => {
    const ingrdientSummary = props.ingredients.map(item => {
        return (
            <li key={item.type}>
               <span style={{textTransform: "capitalize"}}>{item.type}</span> : {item.amount}
            </li>
        )
    })
    return (
        <div>
            <ul>
                {ingrdientSummary}
            </ul>
        </div>
    )
}

export default Summary;