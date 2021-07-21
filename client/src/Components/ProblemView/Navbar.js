import React, { useState } from "react";
import { useSelector } from 'react-redux'
import logo from "../static/logo.svg";
import "./sass/Navbar.css";

import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Avatar from './Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

function Navbar(props) {
  const [currentPage, setCurrentPage] = useState("home");

  const setPage = (e) => {
    document.getElementById(currentPage).className = "nav-link";
    document.getElementById(e).className = "nav-link active";
    setCurrentPage(e);
  };

  const isAuth = useSelector((state)=>state.auth)

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light navbarBack ">
        <Link className="navbar-brand textFont pr-4" to="/" onClick={()=> setPage('home')} >
          <img
            src={logo}
            alt="logo"
            width="40"
            height="35"
            className="d-inline-block align-top"
          />{" "}
          <strong style={{ color: "white" }}>DirtyBits</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item mr-4">
              <Link style={{color:'white'}}
                className="nav-link active"
                to="/"
                id="home"
                onClick={() => setPage("home")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item mr-4">
              <Link style={{color:'white'}}
                className="nav-link"
                to="/new"
                id="compete"
                onClick={() => setPage("compete")}
              >
                Compete
              </Link>
            </li>
            <li className="nav-item mr-4">
              <Link style={{color:'white'}}
                className="nav-link"
                to="/problemlist"
                id="practice"
                onClick={() => setPage("practice")}
              >
                Practice
              </Link>
            </li>
            {/* <li className="nav-item mr-4">
              <a style={{color:'white'}}
                className="nav-link"
                href="/blogs"
                id="blogs"
                onClick={() => setPage("blogs")}
              >
                Blogs
              </a>
            </li> */}
            <li className="nav-item mr-4">
              <Link style={{color:'white'}}
                className="nav-link"
                to = "/leaderboard"
                id="leaderboard"
                onClick={() => setPage("leaderboard")}
              >
                Leaderboard
              </Link>
            </li>
          </ul>
          { isAuth ?

              <ul className="navbar-nav mr-3">
              <li><Avatar img={isAuth.avatar}/></li>
            <li className="nav-item dropdown" id="profileDrop">
              <a style={{color:'white',borderBottomStyle:'none',marginTop:'7px'}}
                className="nav-link dropdown-toggle"
                href="/#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {isAuth.username}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link style={{display:'flex'}} className="dropdown-item" to="/profile">
                  <PersonIcon style={{ margin:'2px 4px 0px -13px',fontSize:'20px'}}/>
                  Profile
                </Link>
                <Link style={{display:'flex'}} className="dropdown-item" to="/#">
                  <BookmarksIcon style={{ margin:'2px 4px 0px -13px',fontSize:'20px'}}/>
                  Bookmarks
                </Link>
                <Link style={{display:'flex'}} className="dropdown-item" to="/dashboard">
                  <DashboardIcon style={{ margin:'2px 4px 0px -13px',fontSize:'20px'}}/>
                  Dashboard
                </Link>
                <div className="dropdown-divider"></div>
                <Link style={{display:'flex'}} className="dropdown-item" to="/settings">
                  <SettingsIcon style={{ margin:'2px 4px 0px -13px',fontSize:'20px'}}/>
                  Settings
                </Link>
                <Link style={{display:'flex'}} className="dropdown-item" data-toggle="modal" data-target="#exampleModal">
                  <ExitToAppIcon style={{ margin:'2px 4px 0px -13px',fontSize:'20px'}}/>
                  Logout
                </Link>
              </div>
            </li>
          </ul>
            :
            ''
          }


        </div>
      </nav>
{/* 
        <button type="button" class="btn btn-primary" >
          Launch demo modal
        </button> */}

        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Log Out</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                 Want to Logout ? 
              </div>
              <div className="modal-footer">
                  <Button style={{outline:'none'}} type="button" variant="text" data-dismiss="modal">Cancel</Button>
                <form action="/api/logout">
                  <Button style={{outline:'none'}} color="secondary" type="submit" variant="contained">Logout</Button>
                </form>
              </div>
            </div>
          </div>
        </div>

          
    </>
  );
}

export default Navbar;
