import { Box, Autocomplete, TextField } from "@mui/material"
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const db = getFirestore();

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function SearchBar() {

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([{name: 'introduzca un termino de busqueda'}]);
  const [titleDB, setTitleDB] = useState([])

  const router = useRouter();


  const getTitles = async () => {
    const querySnapshot = await getDocs(collection(db, "songs"));

    let titles = []
    querySnapshot.forEach((doc) => {
      titles.push({name: doc.data().name, id: doc.data().id})
    });
    setTitleDB(titles);
  }

    const handleSearch = async (event) => {
      setSearchTerm(event.target.value);


      if (event.target.value.length > 2) {
        const items = [];
          titleDB.map((title) => {
            if(title.name.includes(searchTerm)){
              items.push(title)
            }
          })
          setResults(items)
      }
    }

      useEffect(() => {
          getTitles()
      }, [])

  return (
    <Box 
        sx={{marginTop: 2}}>
        <Autocomplete
            disablePortal
            onChange={(event, newValue) => {
              results.map(({id}) => {
                router.push(`/songs/${id}`)
              })
            }}
            id="combo-box-demo"
            options={results.map((option) => capitalize(option.name))}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Buscar una cancion" onChange={handleSearch} value={searchTerm}/>}
    />
    </Box>
  )
}

export default SearchBar