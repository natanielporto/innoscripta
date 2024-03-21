import { useContext } from "react";
import Card from "./components/Card/Card";
import { GlobalContext } from "./globalState/GlobalState";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const { filteredResults, loading } = useContext(GlobalContext)

  if (loading) {
    return <div className="h-[100vh] flex items-center justify-center text-4xl">Loading...</div>
  }

  return (
    <>
      <Navbar />
      <div className="w-[100vw]">
        <div className="flex flex-wrap m-4 gap-4" >
          {filteredResults?.map((item, index) => <Card key={index} {...item} />)
          }
        </div >
      </div>
    </>
  )

}

export default App;
