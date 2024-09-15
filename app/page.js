import WithState from "@/validators/WithState";
import CantemosText from "./components/CantemosText";
import Categories from "./components/Categories";
import LastAddedSongs from "./components/LastAddedSongs";
import LastRegisteredMasses from "./components/LastRegisteredMasses";
import { CircularProgress } from "@mui/material";


export default function Home() {
  return (
    <>
      <CantemosText/>
      <WithState loader={<CircularProgress/>}>
        <LastAddedSongs/>
        <LastRegisteredMasses/>
      </WithState>
      <Categories/>
    </>
  )
}
