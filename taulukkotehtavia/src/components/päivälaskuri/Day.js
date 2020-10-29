
function Day(props) {

    const getTunnit = (päivä) =>
    {
      if(päivä.tunnit === undefined)
      {
        return ""
      }
      
      return päivä.tunnit
    }

    return (
        <div>
            <p>{props.päivä.päiväNimi}</p>
            <input style={{width: 100}} onChange={(e) => props.vaihdaTunnit(e, props.päivä.id)} value={getTunnit(props.päivä)}></input>
        </div>
    );
}

export default Day;
