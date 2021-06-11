import React, {Component} from 'react';
import Burger from './Burger/Burger'
import Controls from './Controls/Controls';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import Summary from './Summary/Summary';


const INGREDIENT_PRICES = {
    salad: 15,
    cheese: 30,
    meat: 80,
}
export default class BurgerBuilder extends Component {
    state = {
        ingredients: [
            {type: 'salad', amount:0},
            {type: 'cheese', amount:0},
            {type: 'meat', amount:0},
        ],
        totalPrice: 50,
        modalOpen: false,
        purchasable:false,
    }

    addIngredientHandle = type => {
        const ingredients = [...this.state.ingredients]
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        for (let item of ingredients) {
            if (item.type === type) item.amount++
            this.updatePurchaseable(newPrice)

        }
        this.setState({ingredients:ingredients, totalPrice : newPrice});
    }

    removeIngredientHandle = type => {
        const ingredients = [...this.state.ingredients]
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        for (let item of ingredients) {
            if (item.type === type) {
                if (item.amount <=0 ) return;
                item.amount--;
                this.updatePurchaseable(newPrice)
            }
        }
        this.setState({ingredients:ingredients, totalPrice:newPrice});    
    }


    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    handleCheout = () => {
        this.props.history.push("/checkout")
    }


    updatePurchaseable = totalPrice => {
        if (totalPrice <= 50){
            this.setState({purchasable: false})
        }
        else{
            this.setState({purchasable: true})
        }
    }

    render() {
        return (
            <div>
            <div className="d-flex flex-md-row flex-column">
                <Burger ingredients={this.state.ingredients}/>
                <Controls 
                ingredientAdded = {this.addIngredientHandle}
                ingredientRemoved = {this.removeIngredientHandle}
                price = {this.state.totalPrice}
                toggleModal = {this.toggleModal}
                purchasable={this.state.purchasable}
                />
            </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.state.totalPrice.toFixed(0)}</h5>
                        <Summary ingredients={this.state.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.handleCheout}>Continute to Checkout</Button>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}