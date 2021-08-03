import React from 'react';

import './Style.css';
import Card from './Card';
import Typical from 'react-typical'

import Loginbutton from '../Buttons/Login.js';
import AOS from 'aos';
import "aos/dist/aos.css";

import array from '../static/array.webp';
import stack from '../static/stack.webp';
import ll from '../static/ll.webp';
import tree from '../static/tree.webp';
import graph from '../static/graphs.webp';
import string from '../static/string.webp';


class ProblemLevel extends React.Component {
    componentDidMount(){
        AOS.init({
            duration : 2000,
            offset:400
          });
    }
    render(){
        return(
            <div className="section">
            <div className="hero">
                <div className="cont">
                <Typical className='title'
                    steps={['Hello Programmers', 5000]}
                    loop={Infinity}
                    wrapper="h5"
                >
                </Typical>                               
                    <p> 
                        Learn Data Structures and Algorithms with us.
                    </p>
                    <div className="login-btn">
                        <Loginbutton/>                        
                    </div>
                </div>
            </div>
                <h1 style={{
                    fontWeight:600,
                    paddingTop:'4rem',
                    color:'teal',
                    textAlign:'center',
                    marginTop:'2%',
                    marginBottom:'-4%'
                }}>Topics</h1>
            <div  className="cards">
                <Card img={array} value={'Arrays'} title={'Array'} description={'Basic level Data Structures and Algorithms'}/>
                <Card img={stack} value={'Stacks'} title={'Stack'} description={'Intermediate level Data Structures and Algorithms'}/>
                <Card img={ll} value={'Linked List'} title={'Linked List'} description={'Advance level Data Structures and Algorithms'}/>
                <Card img={tree} value={'Trees'} title={'Trees'} description={'Advance level Data Structures and Algorithms'}/>
                <Card img={graph} value={'Graphs'} title={'Graphs'} description={'Advance level Data Structures and Algorithms'}/>
                <Card img={string} value={'String'} title={'Strings'} description={'Advance level Data Structures and Algorithms'}/>
            </div>
        </div>
        )
    }
}

export default ProblemLevel;