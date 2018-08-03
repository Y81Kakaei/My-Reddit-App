import React, { Component } from 'react';
import axios from 'axios';
import Style from './miniApp.css';

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state ={

                searchInput: '',
                links: []
        }


    }
    

    ChangeHandler =() =>{

    
        const query = this.refs.name.value;
        this.setState({searchInput: query});
        
        const info = axios.get(`https://www.reddit.com/r/php/search.json?q=${query}`)
        .then((res) => {

            this.setState({links: res.data.data.children});
            
        });
        
        
    } 


    componentDidMountneent(){
        this.ChangeHandler();
    }
    
  render() {
    return (
      <div>

       
        <h1>Reddit</h1>

       
            <input type="text" placeholer="Enter the query" ref="name" />
            <button onClick={this.ChangeHandler.bind(this)}>Search</button>

       
           <ul>
               {this.state.links.map(link =>{
                  return (
                      
                          <li key={link.data.name} > <a href={link.data.url}> {link.data.title} </a> <br/>Author: {link.data.author} <br/> <hr/></li> 
                      
                      )
               })}
           </ul>

      </div>
    )
  }
}
