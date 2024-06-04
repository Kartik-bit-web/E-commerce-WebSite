import { useState, useEffect } from "react";

function Categories(){

    const [useCategory, setCategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:3000/main/categories");
                const data = await response.json();
    
                setCategory(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    })
    return(
        <>
        <h1>This is Categories</h1>
        <h2>{useCategory.length}</h2>

        {useCategory.map((item, index) => {
            <h1>{item.main_category}</h1>
        })}
        </>
    )
}

export default Categories;