import { useState } from "react";
import ExerciseArray from './ExerciseArray'


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

    const [testArray1, setTestArray1] = useState(["Bob", "Mark", "John", "Tony", "Tim"]);
    const [testArray2, setTestArray2] = useState([])

    const moveSelectedRight = (arrayToMove, indexesToRemove) => {

        let tmpArray1 = [...testArray1]
        let tmpArray2 = testArray2.concat(arrayToMove)

        for (let i = indexesToRemove.length - 1; i >= 0; i--) {

                tmpArray1.splice(indexesToRemove[i], 1)
        }

        setTestArray1(tmpArray1)
        setTestArray2(tmpArray2)

    }

    const moveSelectedLeft = (arrayToMove, indexesToRemove) => {

        let tmpArray1 = testArray1.concat(arrayToMove)
        let tmpArray2 = [...testArray2]

        for (let i = indexesToRemove.length - 1; i >= 0; i--) {

            tmpArray2.splice(indexesToRemove[i], 1)
        }

        setTestArray1(tmpArray1)
        setTestArray2(tmpArray2)
    }

    return (
        <div style={mainContainerStyle} >

            <div style={tableContainerStyle}>

                <ExerciseArray testArray={testArray1} moveObjects={moveSelectedRight}/>
                <ExerciseArray testArray={testArray2} moveObjects={moveSelectedLeft}/>

            </div>
        </div >
    );
}

export default Exercise1;