import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

//componente que contém a listagem de nomes
import Accordion from './components/Accordion/Accordion';


import './App.css';



function App() {


  return (
    <div className="App">
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm">
        
                  <Accordion/>
            
          </Container>
        </React.Fragment>
    </div>
  );
}

export default App;
