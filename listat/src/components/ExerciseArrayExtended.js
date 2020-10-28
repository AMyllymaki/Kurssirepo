import { useState, useEffect } from "react";
import Button from '@material-ui/core/Button'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import '../index.css'

const componentContainerStyle =
{
    width: 150,
    minHeight: 450,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 30,
    paddingBottom: 30,
    border: "2px solid black",
    margin: 5,
}
const innerContainerStyle =
{
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
}

function ExerciseArrayExtended(props) {

    const [testArraySorted, setTestArraySorted] = useState([]);
    const [testArrayAscending, setTestArrayAscending] = useState(undefined)
    const [filterText, setFilterText] = useState("")

    const resetSort = () => {

        setTestArraySorted([])
        setTestArrayAscending(undefined)

    }

    const selectArrayObject = (i) => {

        props.selectItem(i, props.arrayNumber)
    }

    const getArrayObjectBorder = (i) => {

        if (props.testArraySelected[i] === true) {
            return "2px solid #3f50b5"
        }
        else {
            return "2px solid black"
        }
    }

    const sortArray = () => {

        let tmpArray = props.testArray
        let tmpArrayAscending = testArrayAscending

        tmpArray.sort()

        if (tmpArrayAscending === undefined) {
            tmpArrayAscending = false
        }
        else if (tmpArrayAscending) {
            tmpArray.reverse()
        }

        setTestArraySorted(tmpArray)
        setTestArrayAscending(!tmpArrayAscending)
    }

    const getUsedArrayForDisplay = () => {

        if (testArraySorted.length !== 0) {
            return filterArray(testArraySorted)
        }

        return filterArray(props.testArray)
    }

    const getSortIcon = () => {
        if (testArrayAscending === undefined) {
            return []
        }
        else if (testArrayAscending) {
            return <ArrowDropUpIcon />
        }
        else {
            return <ArrowDropDownIcon />
        }
    }

    const moveSelected = () => {
        resetSort()
        props.moveSelected(props.arrayNumber)
    }

    //This messes up indexing when used with map
    const filterArray = (arrayToFilter) => {
        if (filterText === "") {
            return arrayToFilter
        }

        let tmpArray = arrayToFilter.filter(name => filterText.toLowerCase() === name.toLowerCase().substring(0, filterText.length))

        return tmpArray
    }

    const changeInput = (event) => {
        setFilterText(event.target.value)
    }

    return (


        <div onClick={moveSelected} style={componentContainerStyle}>

            {props.testArray.length === 0 ?
                <div style={{ display: 'flex', alignItems: 'center', }}>
                    This list has no items
            </div>
                :
                <div style={innerContainerStyle}>

                    <div>
                        <Button style={{ marginBottom: 15, width: 100 }} variant="contained" color="primary" onClick={(e) => { e.stopPropagation(); sortArray() }}> Sort
                    {getSortIcon()}
                        </Button>
                    </div>
                    <div>
                        {getUsedArrayForDisplay().map((arrayObject, i) =>
                            <div className={"nameobject"} onClick={(e) => { e.stopPropagation(); selectArrayObject(i) }}
                                style={{ border: getArrayObjectBorder(i), textAlign: 'center', width: 100, userSelect: 'none', padding: 5, margin: 2 }} key={i}>

                                {arrayObject}
                            </div>)}
                    </div>
                    <div style={{ marginTop: 15 }}>
                        Filter
                        <input style={{}} value={filterText} onClick={(e) => e.stopPropagation()} onChange={(e) => changeInput(e)}></input>
                    </div>

                </div>
            }
        </div>
    )

}


export default ExerciseArrayExtended