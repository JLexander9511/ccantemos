import { Autocomplete, TextField } from "@mui/material"
import { useEffect, useMemo, useState } from "react"

function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const tradOptions = {
  'entrada': 'entry',
  'piedad': 'mercy',
  'gloria': 'glory',
  'introduccion': 'induction',
  'interleccional': 'gospel',
  'ofertorio': 'offertory',
  'santo': 'saint',
  'padreNuestro': 'ourFather',
  'paz': 'peace',
  'cordero': 'lamb',
  'comunion': 'communion',
  'salida': 'exit'
}

export const SongSelector = ({setter, options, type, induction}) => {
    const [titles, setTitles] = useState([])
    const [value, setValue] = useState()
    
    const isProcessing = useMemo( () => titles.length > 0 , [titles])

    let category = induction && 'interleccional' || type

useEffect(() => {
    setTitles(options.filter((option) => option.category.includes(category)))
}, [])

useEffect(() => {
  setter(prevData => ({...prevData, [tradOptions[type]]: value}))
}, [value])


  return (
    isProcessing && <Autocomplete
    multiple
    value={value || []}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
    id="tags-standard"
    options={titles}
    getOptionLabel={(option) => capitalize(option.name)}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="standard"
        label="Elija la cancion o las canciones"
        placeholder="Seleccione la cancion"
      />
    )}
  />
    
  )
}