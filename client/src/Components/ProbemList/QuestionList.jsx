import React, { memo, useEffect, useState } from "react";
import axios from 'axios';

import Card from './Component/Card';
import Spinner from './Component/Spinner';
import Dropdown from './Component/Dropdown';
import Pagination from "./Component/Pagination";

const QuestionList = memo((props) => {
    const [questions, setQuestions] = useState([])              // FOR QUESTIONS
    const [level, setLevel] = useState('')                      // FOR QUESTION'S LEVEL (EASY -> 'E', MEDIUM -> 'M', HARD -> 'H')
    const [currentTags, setCurrentTags] = useState('')    // FOR TRACKING QUESTION'S TAG LIKE ('Arrays', 'Stack', 'Linked List')
    console.log('outside useEffect')

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(3);
    useEffect(() => {
        console.log('inside useEffect')
        setCurrentTags(props.location.state)
        const fetchQuestions = async() => {
            if(currentTags.length){
                try {
                    // FETCHING QUESTIONS ARRAYS WITHOUT LEVEL FOR NOW
                    console.log('requested')
                    const response = await axios.post('http://54.198.168.63/getData/', {
                        'type' : 'list',
                        'tags' : [currentTags],
                    })
                    setQuestions([...response.data])
    
                }catch(error) {
                    console.log('Error', error)
                }
            }
        }

        fetchQuestions()


    },[currentTags])
    
    // Get current post
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentQuestion = questions.slice(indexOfFirstPost, indexOfLastPost);
    

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    console.table(questions)
    return (
        <>
        <h1 className="container" style={{textAlign:'center', marginTop: '4%'}}>Problem List</h1>
        <Dropdown onChange={value => setLevel(value)}/>
        {
          questions.length ? 
          currentQuestion.map(question => <div style={ { fontSize:30,marginTop:'10%',marginLeft:'10%' }} key={question.id}>
            <Card id={question.id} title={question.title} description={question.description}/>
            </div>
            ):<div style={{display:'flex', justifyContent: 'center', marginTop: '5%',height: '50vh'}}><Spinner/></div>
          }
          <Pagination postPerPage={postPerPage} totalPosts={questions.length} paginate={paginate}/>
        </>
    )
})
export default QuestionList;
