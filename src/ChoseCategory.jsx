import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ChoseCategory({ categories, categ, handleCategory }){
    return (
        <div className='chose-category'>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel>Categories</InputLabel>
                <Select value={categ} label="Category" onChange={handleCategory}>
                    <MenuItem value="All"> <em>All</em> </MenuItem>
                    {categories.map((categoryItem, index) => (
                    <MenuItem key={index} value={categoryItem}>
                        {categoryItem}
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default ChoseCategory