
import Display  from "./DisplayElements";
import * as React from 'react';
import ChoseCategory from "./ChoseCategory";
import Cart from "./Cart";
import CartElements from './CartElements';


function App() {
 
  const categories = ["Coffee", "Desserts", "Lunch", "Breakfast", "Juice", "Drinks"];
  const [categ, setCateg] = React.useState('All');
  const [totalItems, setTotalItems] = React.useState(0);
  const [elements, setElements] = React.useState(CartElements);

  const handlesetElements = (index) => {
    setElements(CartElements);
    console.log(CartElements);
    console.log(elements);

    const updatedElements = elements.filter((_, i) => i !== index);
    setElements(updatedElements);
  };


  const updateTotalItems = (items) => {
    setTotalItems(totalItems + items);
  };


  const handleCategory = (event) => {
    setCateg(event.target.value);
  };



  return(
    <>
      <Cart totalItems={totalItems} setTotalItems={setTotalItems} elements={elements} handlesetElements={handlesetElements}/>
      <ChoseCategory categories={categories} categ={categ} handleCategory={handleCategory} />
      <Display  category={categ} updateTotalItems={updateTotalItems} handlesetElements={handlesetElements}/>
    </>

  );
}

export default App
