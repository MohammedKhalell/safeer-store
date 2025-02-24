import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Products from './components/Products/Products'
import './App.scss'

function App() {
  return (
    <Provider store={store}>
      <Header />
      <main>
        <Products />
      </main>
      <Footer />
    </Provider>
  )
}

export default App