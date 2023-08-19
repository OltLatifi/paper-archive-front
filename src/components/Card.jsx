import { useState } from "react"
import { Link } from 'react-router-dom';

function Card(props) {
    const [more, setMore] = useState(false)
    
    return (
        <Link to={"/" + props.id} className="bg-gray-400 rounded-md p-4 relative shadow-md">
            <h3 className="font-bold text-lg">{props.title || props.name}</h3>
            <p>{more? props.abstract: props.abstract.slice(0, 100)}</p>
            <button className={`absolute bottom-0 left-0 bg-gray-500 w-full shadow-md p-2 rounded-lg`} onClick={()=> setMore(!more)}>{more? 'Show less': 'Show more'}</button>
        </Link>
    )
}

export default Card