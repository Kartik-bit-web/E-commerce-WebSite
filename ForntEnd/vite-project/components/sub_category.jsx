import { useState, useEffect } from "react";

function SubCategory(){
    const  [useSubCategory, setSubCategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch("http://127.0.0.1:3000/main/sub_categories");
                const data = await response.json();

                setSubCategory(data);
                // console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    });

    return(
        <>
            <h1>This is SubCategory</h1>
            <h2>{ useSubCategory.length}</h2>

            {useSubCategory.map((item, index) => {
                <h1>{item.sub_category}</h1>
            })}

        </>
    )
}

export default SubCategory;