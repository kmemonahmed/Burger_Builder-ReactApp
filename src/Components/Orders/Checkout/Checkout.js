import React from 'react';
import { Component } from 'react';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}
class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash on Delivery",
        }
    }

     goBack= () => {
        this.props.history.goBack("/");
    }

    inputChangeHandler = e => {
        this.setState({
            values:{
                ...this.state.values,
                [e.target.name] : e.target.value,
            }
        })
    }

    submitHandler = () =>{
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
        }
        axios.post("https://burger-builder-emon-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json", order)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
    render() {
        return(
                <div>
                    <h4 style={{
                        border: "1px solid grey",
                        boxShadow: "1px 1px #888888",
                        padding: "20px"
                    }}>Payment: {this.props.totalPrice} BDT</h4>
                    <form style={{
                        border: "1px solid grey",
                        boxShadow: "1px 1px #888888",
                        padding: "20px"
                    }}>
                    <textarea name="deliveryAddress" value={this.state.deliveryAddress} 
                    className="form-control" placeholder="Your Address" onChange={(e)=>this.inputChangeHandler(e)}></textarea>
                    <br />
                    <input name="phone" className="form-control"value={this.state.phone} 
                    type="phone" placeholder="Your Phone Number" onChange={(e)=>this.inputChangeHandler(e)}></input>
                    <br />
                    <label htmlFor="paymentType">Select Payment Type</label>
                    <br />
                    <select name="paymentType" className="form-control" value={this.state.paymentType} onChange={(e)=>this.inputChangeHandler(e)}>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                        <option value="Bkash">Bkash</option>
                    </select>
                    <br />
                    <Button style={{backgroundColor:"#D70F64"}} className="mr-auto" onClick={this.submitHandler}>Place Order</Button>
                    <Button color="secondary" className="ml-2" style={{marginLeft:"10px"}} onClick={this.goBack}>Cancel</Button>
                    </form>
                </div>
            )    
    }
}
export default connect (mapStateToProps) (Checkout)