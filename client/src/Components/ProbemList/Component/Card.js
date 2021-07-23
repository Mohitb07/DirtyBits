import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { IconButton } from '@material-ui/core'
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';

class Card extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            isBookmarked: false
        }
    }

    toggler() {
        return this.state.isBookmarked  ? <BookmarkOutlinedIcon/> : <BookmarkBorderIcon/>
    }

    render() {
        const {title, description,id} = this.props;
        console.log('card id ' + id)
        return(
            <div style={{width: '50%',marginLeft: '-4%',marginTop: '-9%'}}>
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">Title: {title}</h3>   
                        <IconButton style={{outline:'none'}} onClick={()=>this.setState({isBookmarked:!this.state.isBookmarked})}>
                        {
                            this.toggler()
                        } 
                        </IconButton>      
                        <p style={{fontSize:'15px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}} className="card-text">Description: {description}</p>
                        <Button size="small" color="primary">
                            <Link style={{textDecoration:'none'}} to={{
                                pathname:'/problem',
                                questionId:id
                            }}>Solve</Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;