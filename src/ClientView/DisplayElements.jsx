import Element from "./element"

function Display({category, updateTotalItems, elements,menuItems}){
      
    

    let filteredData; 

    if(category === 'All'){
        filteredData = menuItems.filter(item => item.category);
    }else{
        filteredData = menuItems.filter(item => item.category === category);
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