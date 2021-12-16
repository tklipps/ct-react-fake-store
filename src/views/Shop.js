import React, { Component } from 'react';
import {Col, Row, Button, Container} from 'react-bootstrap';
import {getItems} from '../api/apiItems';
import ItemCard from '../components/ItemCard';
import {titleCase} from '../helpers'


export default class Shop extends Component {
    constructor() {
        super();
        this.state={
            items:[],
            serverErrorCats:false,
            serverErrorItems:false,
            tokenError:false,
            itemStart: 0,
            itemEnd:9
        };
    };


    componentDidMount() {        
        this.getAllItems()
    }
    


    getAllItems=async () =>{
        const items = await getItems(localStorage.getItem('token'))
        if(items===400){this.setState({tokenError:true})}
        if(items===500){this.setState({serverErrorItems:true})}
        if (items !==500 && items !==400){this.setState({items:items}, console.log("yo", this.state.items))}
        
    }

    handlePrev=()=>{
        const oldStart=this.state.itemStart
        const oldEnd=this.state.itemEnd
        this.setState({itemStart:oldStart-9, itemEnd:oldEnd-9})
    }

    handleNext=()=>{
        const oldStart=this.state.itemStart
        const oldEnd=this.state.itemEnd
        this.setState({itemStart:oldStart+9, itemEnd:oldEnd+9})
    }



    render() {
        
        return (
            <div>
                
                <div className="d-flex justify-content-center">
                    <Button variant="danger" className={"me-2 " + (this.state.itemStart===0?"disabled":'')} onClick={()=>this.handlePrev()}>{"<< Prev"}</Button>
                    <Button variant="success" className={" " + (this.state.items?.length<=this.state.itemEnd?"disabled":'')} onClick={()=>this.handleNext()}>{"Next >>"}</Button>
                </div>
            
               <Row>
                            {this.state.items.slice(this.state.itemStart,this.state.itemEnd)
                                .map((i)=><ItemCard addToCart={this.props.addToCart} item={i} key={i.id}/>)}
               </Row>   
            </div>
        )
    }
}