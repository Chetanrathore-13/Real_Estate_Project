import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import './index.css'

import AppRoutes from './routes/AppRoutes.jsx'

const App = () => <AppRoutes />;

ReactDOM.createRoot(document.getElementById('root')).render(
     <Provider store={store}>
    <App />
    </Provider>
)
