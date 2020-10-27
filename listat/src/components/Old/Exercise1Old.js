import { useState } from "react";


const mainContainerStyle =
{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 100
}

const tableContainerStyle =
{
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 800,
    height: 300
}

function Exercise1() {

    const [testArray1, setTestArray1] = useState(["Bob", "Mark", "John", "Tony"]);
    const [testArray1Selected, setTestArray1Selected] = useState([false, false, false, false]);
    const [testArray1Sorted, setTestArray1Sorted] = useState([]);
    const [testArray1Ascending, setTestArray1Ascending] = useState(undefined)
    
    const [testArray2, setTestArray2] = useState([])
    const [testArray2Selected, setTestArray2Selected] = useState([]);
    const [testArray2Sorted, setTestArray2Sorted] = useState([]);
    const [testArray2Ascending, setTestArray2Ascending] = useState(undefined)
    


    const resetSort = () =>
    {
        setTestArray1Sorted([])
        setTestArray1Ascending(undefined)
        setTestArray2Sorted([])
        setTestArray2Ascending(undefined)
    }

    const moveSelectedRight = () => {

        let tmpArray1 = [...testArray1]
        let tmpArray2 = [...testArray2]

        let tmpArray1Select = [...testArray1Selected]
        let tmpArray2Select = [...testArray2Selected]


        for (let i = tmpArray1.length - 1; i >= 0; i--) {

            if (testArray1Selected[i]) {

                tmpArray2.push(tmpArray1[i])
                tmpArray2Select.push(true)
                tmpArray1.splice(i, 1)
                tmpArray1Select.splice(i, 1)
            }
        }


        setTestArray1(tmpArray1)
        setTestArray2(tmpArray2)
        setTestArray1Selected(tmpArray1Select)
        setTestArray2Selected(tmpArray2Select)
        resetSort()
    }

    const moveSelectedLeft = () => {

        let tmpArray1 = [...testArray1]
        let tmpArray2 = [...testArray2]

        let tmpArray1Select = [...testArray1Selected]
        let tmpArray2Select = [...testArray2Selected]


        for (let i = tmpArray2.length - 1; i >= 0; i--) {


            if (testArray2Selected[i]) {

                tmpArray1.push(tmpArray2[i])
                tmpArray1Select.push(true)
                tmpArray2.splice(i, 1)
                tmpArray2Select.splice(i, 1)
            }
        }


        setTestArray1(tmpArray1)
        setTestArray2(tmpArray2)
        setTestArray1Selected(tmpArray1Select)
        setTestArray2Selected(tmpArray2Select)
    }

    const selectArrayObject = (i, arrayNumber) => {


        if (arrayNumber === 1) {
            let tmpArray = [...testArray1Selected]

            tmpArray[i] = !tmpArray[i]


            setTestArray1Selected(tmpArray)

        }
        else {

            let tmpArray = [...testArray2Selected]

            tmpArray[i] = !tmpArray[i]


            setTestArray2Selected(tmpArray)
        }


    }

    const getArrayObjectBorder = (i, arrayNumber) => {

        if (arrayNumber === 1) {
            if (testArray1Selected[i] === true) {
                return "2px solid blue"
            }
            else {
                return "2px solid black"
            }
        }
        else {
            if (testArray2Selected[i] === true) {
                return "2px solid blue"
            }
            else {
                return "2px solid black"
            }
        }

    }

    const sortArray = (arrayNumber) =>
    {
        let tmpArray
        let tmpArrayAscending

        if (arrayNumber === 1) {
            
            tmpArray = testArray1
            tmpArrayAscending = testArray1Ascending

            

            tmpArray.sort()

            if(tmpArrayAscending === undefined)
            {
                tmpArrayAscending = false
            }
            else if(tmpArrayAscending)
            {
                tmpArray.reverse()
            }
         
            setTestArray1Sorted(tmpArray)
            setTestArray1Ascending(!tmpArrayAscending)
        }
        else
        {
            tmpArray = testArray2
            tmpArrayAscending = testArray2Ascending

            tmpArray.sort()

            if(tmpArrayAscending === undefined)
            {
                tmpArrayAscending = false
            }
            else if(tmpArrayAscending)
            {
                tmpArray.reverse()
            }
         
            setTestArray2Sorted(tmpArray)
            setTestArray2Ascending(!tmpArrayAscending)
        }
    }

    const getUsedArrayForDisplay = (arrayNumber) =>
    {

        if(arrayNumber === 1)
        {
            if(testArray1Sorted.length !== 0)
            {
                return testArray1Sorted
            }

            return testArray1
        }
        else
        {
            if(testArray2Sorted.length !== 0)
            {
                return testArray2Sorted
            }

            return testArray2
        }
    }

    const getSortButtonText = (arrayNumber) =>
    {
        if(arrayNumber === 1)
        {
            if(testArray1Ascending === undefined)
            {
                return "Sort"
            }
            else if(testArray1Ascending)
            {
                return "Sort Asc"
            }
            else
            {
                return "Sort Desc"
            }
        }
        else 
        {
            if(testArray2Ascending === undefined)
            {
                return "Sort"
            }
            else if(testArray2Ascending)
            {
                return "Sort Asc"
            }
            else
            {
                return "Sort Desc"
            }
        }
    }

    return (
        <div style={mainContainerStyle} >

            <div style={tableContainerStyle}>


                <div style={{ width: 150,  display: 'flex', justifyContent:'center' }}>
                  
                    {testArray1.length === 0 ? "This list has no items" :
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <button onClick={() => sortArray(1)}>{getSortButtonText(1)}</button>
                            {getUsedArrayForDisplay(1).map((arrayObject, i) => <div onClick={() => selectArrayObject(i, 1)}
                                style={{ border: getArrayObjectBorder(i, 1), textAlign: 'center', width: 70, userSelect: 'none', padding: 5, margin: 2 }} key={i} value={arrayObject}>

                                {arrayObject}
                            </div>)}
                        </div>
                    }
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <button onClick={moveSelectedRight}> {"--->"} </button>
                    <button onClick={moveSelectedLeft}> {"<---"} </button>
                </div>
                <div style={{ width: 150,  display: 'flex', justifyContent:'center' }}>
                    {testArray2.length === 0 ? "This list has no items" :
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <button onClick={() => sortArray(2)}>{getSortButtonText(2)}</button>
                            {getUsedArrayForDisplay(2).map((arrayObject, i) => <div onClick={() => selectArrayObject(i, 2)}
                                style={{ border: getArrayObjectBorder(i, 2), textAlign: 'center', width: 70, userSelect: 'none', padding: 5, margin: 2 }} key={i} value={arrayObject}>

                                {arrayObject}
                            </div>)}
                        </div>
                    }
                </div>

            </div>

        </div>
    );
}

export default Exercise1;