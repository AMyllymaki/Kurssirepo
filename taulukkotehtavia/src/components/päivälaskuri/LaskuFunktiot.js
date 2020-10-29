
export const laskeKeskiarvoFor = (viikkoTaulukko) => {

    if(eiArvoja(viikkoTaulukko))
    {
        return "Ei tunteja"
    }
    
    let lasketutTunnit = 0
    let summa = 0

    viikkoTaulukko.forEach(päivä => {

      if (päivä.tunnit !== undefined && päivä.tunnit !== "") {
        summa = summa + parseFloat(päivä.tunnit)
        lasketutTunnit++
      }
    });

    return (summa / lasketutTunnit).toFixed(2)
  }

  export const laskeKeskiarvoReducerilla = (viikkoTaulukko) => {

    if(eiArvoja(viikkoTaulukko))
    {
        return "Ei tunteja"
    }

    let työtunnit = viikkoTaulukko.filter(päivä => päivä.tunnit !== undefined && päivä.tunnit !== "")
    työtunnit = työtunnit.map(päivä => parseFloat(päivä.tunnit));

    let reducer = (acc, cur) => acc + cur

    return (työtunnit.reduce(reducer) / työtunnit.length).toFixed(2)
  }

  export const laskeMinFor = (viikkoTaulukko) => {

    if(eiArvoja(viikkoTaulukko))
    {
        return "Ei tunteja"
    }

    let pienin = undefined

    viikkoTaulukko.forEach(päivä => {

      if (päivä.tunnit !== undefined && päivä.tunnit !== "") {
        if (pienin === undefined) {
          pienin = päivä.tunnit
        }
        else if (pienin > päivä.tunnit) {
          pienin = päivä.tunnit
        }
      }
    });

    return pienin
  }


  export const laskeMaxFor = (viikkoTaulukko) => {

    if(eiArvoja(viikkoTaulukko))
    {
        return "Ei tunteja"
    }

    let pienin = undefined

    viikkoTaulukko.forEach(päivä => {

      if (päivä.tunnit !== undefined && päivä.tunnit !== "") {
        if (pienin === undefined) {
          pienin = päivä.tunnit
        }
        else if (pienin < päivä.tunnit) {
          pienin = päivä.tunnit
        }
      }

    });

    return pienin
  }

  export const laskeMinReducer = (viikkoTaulukko) => {

    if(eiArvoja(viikkoTaulukko))
    {
        return "Ei tunteja"
    }

    let työtunnit = viikkoTaulukko.filter(päivä => päivä.tunnit !== undefined && päivä.tunnit !== "")
    työtunnit = työtunnit.map(päivä => parseFloat(päivä.tunnit));

    let reducer = (acc, cur) => { return acc < cur ? acc : cur }

    return työtunnit.reduce(reducer)
  }

  export const laskeMaxReducer = (viikkoTaulukko) => {

    if(eiArvoja(viikkoTaulukko))
    {
        return "Ei tunteja"
    }

    let työtunnit = viikkoTaulukko.filter(päivä => päivä.tunnit !== undefined && päivä.tunnit !== "")
    työtunnit = työtunnit.map(päivä => parseFloat(päivä.tunnit));

    let reducer = (acc, cur) => { return acc > cur ? acc : cur }

    return työtunnit.reduce(reducer)
  }

  const eiArvoja = (viikkoTaulukko) =>
  {
    let työtunnit = viikkoTaulukko.filter(päivä => päivä.tunnit !== undefined && päivä.tunnit !== "")
    if(työtunnit.length === 0)
    {
        return true
    }

    return false
  }