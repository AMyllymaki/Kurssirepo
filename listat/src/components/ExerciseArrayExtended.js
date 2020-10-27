import { useState, useEffect } from "react";

const componentContainerStyle=
{
    width: 150, 
    minHeight: 400, 
    display: 'flex', 
    justifyContent: 'center',
     padding: 50, 
     border: "2px solid black" 
}
const innerContainerStyle=
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
            return "2px solid blue"
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

    const getSortButtonText = () => {

        if (testArrayAscending === undefined) {
            return "Sort"
        }
        else if (testArrayAscending) {
            return "Sort Asc"
        }
        else {
            return "Sort Desc"
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

            {props.testArray.length === 0 ? "This list has no items" :
                <div style={innerContainerStyle}>

                    <button onClick={(e) => { e.stopPropagation(); sortArray() }}>{getSortButtonText()}</button>
                    <div>
                        {getUsedArrayForDisplay().map((arrayObject, i) =>
                            <div onClick={(e) => { e.stopPropagation(); selectArrayObject(i) }}
                                style={{ border: getArrayObjectBorder(i), textAlign: 'center', width: 70, userSelect: 'none', padding: 5, margin: 2 }} key={i}>

                                {arrayObject}
                            </div>)}
                    </div>

                    <div>
                        Filter
                        <input style={{ marginTop: 5 }} value={filterText} onClick={(e) => e.stopPropagation()} onChange={(e) => changeInput(e)}></input>
                    </div>

                </div>
            }
        </div>
    )

}


export default ExerciseArrayExtended