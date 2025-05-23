import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20"> {/* pt-20 para compensar o navbar fixo */}
        <Login />
      </main>
      <Footer />
    </div>
  )
}

export default App;