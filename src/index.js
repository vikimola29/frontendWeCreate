import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LanguageProvider from "./static/components/languageProvider";

ReactDOM.render(
    <LanguageProvider>

        <App/>
    </LanguageProvider>,
    document.getElementById('root')
);
