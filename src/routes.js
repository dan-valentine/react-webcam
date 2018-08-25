import React from 'react';
import {Route } from 'react-router-dom';
import Home from './components/Home';
import WebCam from './components/WebCam';
export default (
    <div>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={Home} />
        <Route path='/faq' component={Home} />
        <Route path='/camera' render={()=>[<WebCam/>,<WebCam/>]} />
    </div>
);