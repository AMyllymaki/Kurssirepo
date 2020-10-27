// import { useState, useEffect } from "react";


// function ExerciseArray(props) {

   
//     const tmpArray = []

//     props.testArray.forEach(element => {
//         tmpArray.push(false)
//     });

    
//     const [testArraySorted, setTestArraySorted] = useState([]);
//     const [testArrayAscending, setTestArrayAscending] = useState(undefined)
//     const [filterText, setFilterText] = useState("")

//     useEffect(() => {

//         newValuesFromParent()

//     }, [props.testArray])

//     const newValuesFromParent = () =>
//     {
//         resetSort()
//     }

//     const resetSort = () => {
//         setTestArraySorted([])
//         setTestArrayAscending(undefined)

//     }

//     const selectArrayObject = (i) => {

//         let tmpArray = [...testArraySelected]
//         tmpArray[i] = !tmpArray[i]
//         setTestArraySelected(tmpArray)
//     }

//     const getArrayObjectBorder = (i) => {

//         if (testArraySelected[i] === true) {
//             return "2px solid blue"
//         }
//         else {
//             return "2px solid black"
//         }
//     }

//     const sortArray = () => {

//         let tmpArray = props.testArray
//         let tmpArrayAscending = testArrayAscending

//         tmpArray.sort()

//         if (tmpArrayAscending === undefined) {
//             tmpArrayAscending = false
//         }
//         else if (tmpArrayAscending) {
//             tmpArray.reverse()
//         }

//         setTestArraySorted(tmpArray)
//         setTestArrayAscending(!tmpArrayAscending)
//     }

//     const getUsedArrayForDisplay = () => {

//         if (testArraySorted.length !== 0) {
//             return filterArray(testArraySorted)
//         }

//         return filterArray(props.testArray)
//     }

//     const getSortButtonText = () => {

//         if (testArrayAscending === undefined) {
//             return "Sort"
//         }
//         else if (testArrayAscending) {
//             return "Sort Asc"
//         }
//         else {
//             return "Sort Desc"
//         }
//     }

//     const moveSelected = () =>
//     {
//         const arrayToMove = []
//         const indexesToRemove = []

//         for(let i = 0; i < testArraySelected.length; i++)
//         {
//             if(testArraySelected[i]) 
//             {
//                 arrayToMove.push(props.testArray[i])
//                 indexesToRemove.push(i)
//             }
//         }

//         props.moveObjects(arrayToMove, indexesToRemove)
//     }

//     //This messes up indexing when used with map
//     const filterArray = (arrayToFilter) =>
//     {
//         if(filterText === "")
//         {
//             return arrayToFilter
//         }

//         let tmpArray = arrayToFilter.filter(name => filterText.toLowerCase() === name.toLowerCase().substring(0, filterText.length))

//         return tmpArray
//     }

//     const changeInput = (event) =>
//     {
//         setFilterText(event.target.value)
//     }

//     return (


//         <div style={{ width: 150, display: 'flex', justifyContent: 'center', padding: 50, border: "2px solid black"  }}>

//             {props.testArray.length === 0 ? "This list has no items" :
//                 <div style={{ display: 'flex', flexDirection: 'column' }}>
//                     <button onClick={() => sortArray()}>{getSortButtonText()}</button>
//                     {getUsedArrayForDisplay().map((arrayObject, i) => 
//                     <div onClick={() => selectArrayObject(i)}
//                     style={{ border: getArrayObjectBorder(i), textAlign: 'center', width: 70, userSelect: 'none', padding: 5, margin: 2 }} key={i}>

//                         {arrayObject}
//                     </div>)}

//                     <button onClick={moveSelected}> {"Move"} </button>
//                     <input style={{marginTop: 5}} value={filterText} onChange={(e) => changeInput(e)}></input>
               
//                 </div>
//             }
//         </div>
//     )

// }


// export default ExerciseArray