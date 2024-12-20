import Home from "./components/Home";

function App() {
  return (
    <>
      <div className="grid grid-rows-1 h-screen bg-indigo-100">
        <div className="grid grid-cols-12 bg-contain bg-no-repeat bg-center content-center" style={{backgroundImage: 'url("http://localhost:5173/src/assets/background.png")'}}>
          <div className="col-span-2"></div>
          <div className="col-span-4">
            <Home />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
