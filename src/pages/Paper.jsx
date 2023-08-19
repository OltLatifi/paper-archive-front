import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";

function Paper() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false);

    async function fetchData() {
        try {
            const response = await axios.get("papers/" + id);
            setData(response.data);
            setLoaded(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        loaded ? (
            <div className='flex justify-center items-center w-screen h-screen'>
                <div className="bg-gray-400 rounded-md p-4 shadow-md max-w-2xl w-1/2 mx-auto">
                    <h3 className="font-bold text-lg">{data.title}</h3>
                    <p>
                        {data.abstract}
                    </p>
                    <h4 className="font-bold">Categories</h4>
                    <div className="flex gap-2 my-2">
                        {data.categories.map((category) => {
                            return(
                                <div className='bg-gray-300 w-fit p-2 rounded-lg'>{category.name}</div>
                            )
                        })}
                    </div>
                    <h4 className="font-bold">Authors</h4>
                    <div className="flex gap-2 my-2">
                        {data.authors.map((author) => {
                            return(
                                <div className='bg-gray-300 w-fit p-2 rounded-lg'>{author.name}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        ) : (
            <div>Loading...</div>
        )
    );
}

export default Paper;
