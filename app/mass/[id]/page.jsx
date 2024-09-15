import MassShowcase from "./components/MassShowcase"

function page({params}) {
  return (
  <>
  <MassShowcase id={params.id}/>
  </>
  )
}

export default page