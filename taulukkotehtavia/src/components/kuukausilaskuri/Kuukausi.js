
function Kuukausi(props) {

    const getPalkka = (kuukausi) =>
    {
      if(kuukausi.palkka === undefined)
      {
        return ""
      }
      
      return kuukausi.palkka
    }

    return (
        <div>
            <p>{props.kuukausi.kuukaudenNimi}</p>
            <input style={{width: 100}} onChange={(e) => props.vaihdaPalkka(e, props.kuukausi.id)} value={getPalkka(props.kuukausi)}></input>
        </div>
    );
}

export default Kuukausi;
