import { useState, Component } from "react";
import ExerciseArrayExtended from './ExerciseArrayExtended'


const mainContainerStyle =
{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 250
}

const tableContainerStyle =
{
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    height: 300
}

function Exercise1Extended() {

    const [testArrays, setTestArrays] = useState([["Bob", "Mark", "John", "Tony", "Tim", "Matt", "Margaret", "Moe", "George"], [], []]);
    const [testArraysSelected, setTestArraysSelected] = useState([[], [], []])

    const moveSelected = (arrayIndex) => {

        let tmpTestArrays = [...testArrays]
        let tmpTestArraysSelected = [...testArraysSelected]

        //Loops through all arrays and moves selected objects to the selected array
        tmpTestArraysSelected.forEach((array, index) => {

            //Does not add items that are already in the array
            if (index !== arrayIndex) {
                array.forEach((selection, selectionIndex) => {
                    if (selection === true) {
                        tmpTestArrays[arrayIndex].push(tmpTestArrays[index][selectionIndex])
                    }
                })
            }
        })

        for (let j = 0; j < tmpTestArraysSelected.length; j++) {
            for (let i = tmpTestArraysSelected[j].length - 1; i >= 0; i--) {

                //Does not remove the selected items from the target array
                if (j === arrayIndex) {
                    break
                }

                console.log(tmpTestArraysSelected[j][i])

                if (tmpTestArraysSelected[j][i]) {
                    tmpTestArraysSelected[j].splice(i, 1)
                    tmpTestArrays[j].splice(i, 1)
                }

            }
        }

        setTestArrays(tmpTestArrays)
        setTestArraysSelected(tmpTestArraysSelected)

    }

    const selectItem = (position, arrayNumber) => {

        let tmpArray = [...testArraysSelected]

        tmpArray[arrayNumber][position] = !tmpArray[arrayNumber][position]

        setTestArraysSelected(tmpArray)
    }

    return (
        <div style={mainContainerStyle} >

            <div style={tableContainerStyle}>

                {testArrays.map((arrayObject, i) =>
                    <ExerciseArrayExtended testArray={arrayObject} key={i} testArraySelected={testArraysSelected[i]} selectItem={selectItem} arrayNumber={i} moveSelected={moveSelected} />
                )}

            </div>
        </div >
    );
}

export default Exercise1Extended;