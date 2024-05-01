
function ChoseCategory({ categories, categ, handleCategory }){
    return (
        <div className='chose-category'>
            <nav >
                <ul className='horizontal-nav' value={categ} label="Category" onChange={handleCategory}>
                    {categories.map((categoryItem, index) => (
                        <li key={index}>
                            <button key={index} value={categoryItem} onClick={handleCategory}>
                                {categoryItem}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default ChoseCategory