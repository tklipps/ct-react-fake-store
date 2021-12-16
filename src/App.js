import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Shop from './views/Shop';
import Login from './views/Login';
import Logout from './views/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleItem from "./views/SingleItem";
import Cart from "./views/Cart";


export default class App extends Component {

  constructor(){
    super();
    this.state={
    user: "",
    token: "",
    cart: {},
    isAdmin: true  
    }
  }

  doLogout=()=>{
    console.log("Logged out")
    localStorage.clear();
    this.setToken('');
    this.setState({cart:{}});

  }

  setToken = (token) => {
    localStorage.setItem("token", token);
    this.setState({ token });
    
  };

  setUser = (user) => {
    this.setState({ user });
  };

  addToCart=(item)=>{
    let cart = this.state.cart
    if (cart[item.name]){
      cart[item.name].quantity++
    }else{
      cart[item.name]={...item,quantity:1}
    }
    this.setState({cart})
    localStorage.setItem("cart",JSON.stringify(cart))
    alert(`Thanks for adding ${item.name} to your cart`)
  };

  getCartItemTotal=()=>{
    let total=0
    for (const item in this.state.cart){
      total+=this.state.cart[item].quantity
    }
    return total
  };

  getCartTotalPrice=()=>{
    let total=0
    for (const item in this.state.cart){
      total+=this.state.cart[item].quantity*this.state.cart[item].price
    }
    return total
  }

  removeFromCart = (item)=>{
    let cart=this.state.cart;
    if (cart[item.name].quantity >1){
      cart[item.name].quantity--
    }else if (cart[item.name].quantity === 1){
      delete cart[item.name]
    }
    this.setState({cart})
    localStorage.setItem("cart",JSON.stringify(cart))
    alert(`You remove ${item.name} from your cart`)
  }

  removeAllFromCart=(item)=>{
    let cart=this.state.cart;
    if(cart[item.name]){
      delete cart[item.name];
    }
    this.setState({cart})
    localStorage.setItem("cart",JSON.stringify(cart))
    alert(`You remove all of ${item.name}s from your cart`)
  }

  clearCart=()=>{
    this.setState({cart:{}})
    localStorage.removeItem("cart")
  }




  render () {
    return (
      <div>
         <NavBar token={this.state.token} isAdmin={this.state.isAdmin} user={this.state.user} getCartItemTotal={this.getCartItemTotal} getCartTotalPrice={this.getCartTotalPrice}/>
        <Switch>
          <ProtectedRoute exact path = "/" token={this.state.token} render = {()=><Shop addToCart={this.addToCart}/>}/>

          <ProtectedRoute exact path ="/logout" token={this.state.token} render={()=><Logout doLogout={this.doLogout}/>}/>

          <ProtectedRoute exact path ="/cart" token={this.state.token} 
                render={()=><Cart 
                            cart={this.state.cart} 
                            removeFromCart={this.removeFromCart} 
                            removeAllFromCart={this.removeAllFromCart}
                            getCartItemTotal={this.getCartItemTotal}
                            getCartTotalPrice={this.getCartTotalPrice}
                            />} />
           
          <Route exact path ="/login" render={()=><Login setUser={this.setUser} setToken={this.setToken}/>} />
            
        </Switch>
      </div>
    )
  }
}