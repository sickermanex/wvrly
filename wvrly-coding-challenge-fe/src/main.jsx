import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.jsx'
import './index.css'
import MapView from './components/MapView/MapView.jsx'
import UserForm from './components/UserForm/UserForm.jsx'
import { Provider } from 'react-redux'
import { store } from './store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <App /> */}
    <UserForm />
  </Provider>
)
