import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';


describe('root App component', () => {
    it('should mount App Component w/o crash', () => {
        var div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});