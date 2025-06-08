import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Pages/Home";
import CorpRecommandation from "./Pages/CorpRecommandation";
import PricePrediction from "./Pages/PricePrediction";
import LivePrice from "./Pages/LivePrice";
import AboutUs from "./Pages/AboutUs";
import SoilType from './Pages/SoilType';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recommendation' element={<CorpRecommandation />} />
        <Route path='/priceprediction' element={<PricePrediction />} />
        <Route path='/livepriceprediction' element={<LivePrice />} />
        <Route path='/soiltype' element={<SoilType />} />
        <Route path='/aboutus' element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
