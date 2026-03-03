import Sjoerd from './assets/sjoerd.jpg'

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">
        Vite + React + Tailwind werkt, dus Sjoerd is een blij man!
        <div className="text-sm text-gray-500 mt-2">En dat is maar goed ook, want hij heeft er hard aan gewerkt!</div>
        <div className="grid grid-cols-10 gap-1 mt-10">
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
          <img src={Sjoerd} alt="Sjoerd" className="w-20 h-48 rounded-full object-cover" />
        </div>
        <div className="text-sm text-gray-500 mt-4">Wees als Sjoerd, een blij persoon!</div>
      </h1>
    </div>
  );
}

export default App;