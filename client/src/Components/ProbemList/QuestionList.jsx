import React, { useEffect, useState } from "react";
import axios from 'axios';

import Card from './Component/Card';
import Spinner from './Component/Spinner';
import Dropdown from './Component/Dropdown';

const QuestionList = (props) => {
    const [questions, setQuestions] = useState([])              // FOR QUESTIONS
    const [level, setLevel] = useState('')                      // FOR QUESTION'S LEVEL (EASY -> 'E', MEDIUM -> 'M', HARD -> 'H')
    const [currentTags, setCurrentTags] = useState('Arrays')    // FOR TRACKING QUESTION'S TAG LIKE ('Arrays', 'Stack', 'Linked List')
    useEffect(() => {
        console.log('question list rendered')
        const tags = props.location.state ? setCurrentTags(props.location.state) : setCurrentTags(currentTags)
        
        const fetchQuestions = async() => {
            try {
                // FETCHING QUESTIONS ARRAYS WITHOUT LEVEL FOR NOW
                const response = await axios.post('http://54.198.168.63/getData/', {
                    'type' : 'list',
                    'tags' : [currentTags],
                })
                setQuestions([...response.data])

            }catch(error) {
                console.log('Error', error)
            }
        }

        fetchQuestions()
    },[currentTags, props.location.state])

    return (
        <>
        <h1 className="container" style={{textAlign:'center', marginTop: '4%'}}>Problem List</h1>
        <Dropdown onChange={value => setLevel(value)}/>
        {
          questions.length ? 
          questions.map(question => <div style={ { fontSize:30,marginTop:'10%',marginLeft:'10%' }} key={question.id}>
            <Card id={question.id} title={question.title} description={question.description}/>
            </div>
            ):<div style={{display:'flex', justifyContent: 'center', marginTop: '5%',height: '50vh'}}><Spinner/></div>
          }
        </>
    )
}
export default QuestionList;
