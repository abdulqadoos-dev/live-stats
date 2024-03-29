import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux';
import store from "./state/store";
import AppContainer from "./Components/Containers/AppContainer";

// ReactDOM.render(
//
//     <Provider store={store}>
//         <React.StrictMode>
//             <AppContainer/>
//         </React.StrictMode>
//     </Provider>,
//
//     document.getElementById('root')
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import {createRoot} from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <AppContainer/>
        </React.StrictMode>
    </Provider>
);
reportWebVitals();