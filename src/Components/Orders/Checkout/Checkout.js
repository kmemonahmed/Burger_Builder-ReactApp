import React from 'react';
import { Component } from 'react';
import {Button, Modal, ModalBody} from 'reactstrap';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import {resetIngredients} from '../../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        resetIngredients: ()=> dispatch(resetIngredients())
    }
}

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash on Delivery",
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
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
        this.setState({isLoading: true});

        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
        }
        axios.post("https://burger-builder-emon-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json", order)
        .then(response => {
            if (response.status === 200) {
                this.setState({
                    isLoading:false,
                    isModalOpen: true,
                    modalMsg: "Order Placed Successfully!"
                })
                this.props.resetIngredients();
            }

            else {
                this.setState({
                    isLoading:false.purchasable,
                    isModalOpen:true,
                    modalMsg: "Something went Wrong! Order Again"
                })
            }
        })
        .catch(err => {
            this.setState({
                isLoading:false,
                isModalOpen:true,
                modalMsg: err.message
            })
        })
    }
    render() {
        let form = (<div>
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
                <Button style={{backgroundColor:"#D70F64"}} disabled={!this.props.purchasable} className="mr-auto" onClick={this.submitHandler}>Place Order</Button>
                <Button color="secondary" className="ml-2" style={{marginLeft:"10px"}} onClick={this.goBack}>Cancel</Button>
                </form>
        </div>)
        return(
                <div>
                    {this.state.isLoading? <Spinner /> : form}
                    <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                        <ModalBody>
                            <p>{this.state.modalMsg}</p>
                        </ModalBody>
                    </Modal>
                </div>
            )    
    }
}
export default connect (mapStateToProps, mapDispatchToProps) (Checkout)