import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import Legendaries from './pages/Legendaries';
import Documentation from './pages/Documentation';
import Header from './components/Header';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pokedex" element={<Pokedex />} />
                    <Route path="/legendaries" element={<Legendaries />} />
                    <Route path="/documentation" element={<Documentation />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
