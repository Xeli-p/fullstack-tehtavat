import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from 'react-redux'

const Filter = () => {

    const dispatch = useDispatch()

    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        dispatch(filterChange(newFilter));
    }

    const style = {
      marginBottom: 10,
      marginTop: 20
    }
  
    return (
      <div style={style}>
        <form>
        filter <input onChange={handleFilterChange} />
        </form>
      </div>
    )
  }
  
  export default Filter