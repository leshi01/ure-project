import Data from "../Data"
import Element from "./element"

function Display({category, updateTotalItems, elements}){
      
    

    let filteredData; 

    if(category === 'All'){
        filteredData = Data.filter(item => item.category);
    }else{
        filteredData = Data.filter(item => item.category === category);
    }

    return(
        <>
            {filteredData.map((item, index) => (
                <Element
                    key={index}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    category={item.category}
                    updateTotalItems={updateTotalItems}
                    elements={elements}
                />
            ))}
        </>
    );
}

export default Display