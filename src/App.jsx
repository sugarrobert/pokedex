import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import Legendaries from './pages/Legendaries';
import Documentation from './pages/Documentation';
import Pokemon from './pages/Pokemon';
import NoMatch from './pages/NoMatch';
import Header from './components/Header';
import Footer from './components/Footer';
import { PokedexTemplateProvider } from './context/PokedexContext';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/pokedex"
                        element={
                            <PokedexTemplateProvider>
                                <Pokedex />
                            </PokedexTemplateProvider>
                        }
                    />
                    <Route
                        path="/pokemon/:pokemonName/:pokemonId"
                        element={<Pokemon />}
                    />
                    <Route path="/legendaries" element={<Legendaries />} />
                    <Route path="/documentation" element={<Documentation />} />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;
