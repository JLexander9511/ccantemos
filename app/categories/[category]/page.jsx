import { Card, CircularProgress, List, Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import { CatSongList } from "./components/CatSongList";

function CategoryList ({ params }) {

    function capitalize(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Card sx={{marginX:2, marginY: 2}} variant='outlined'>
            <Typography variant="h2" fontWeight={600} fontSize={25} sx={{marginTop:2, marginLeft:2}}>{capitalize(params.category)}</Typography>
            <CatSongList category={ params.category }/>
        </Card>
    )
  }
  
  export default CategoryList

  