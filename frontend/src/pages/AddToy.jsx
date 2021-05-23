import { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { addToy } from '../store/actions/toy.action.js'
import { connect } from 'react-redux';



class _AddToy extends Component {

    state = {
        newToy: {
            name: '',
            type: '',
            price: 0
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.name === 'price' ? +target.value : target.value
        this.setState(prevState => ({
            ...prevState,
            newToy: {
                ...prevState.newToy,
                [field]: value
            }
        }))
    }

    onSubmitForm = async (ev) => {
        ev.preventDefault()
        const newToy = { ...this.state.newToy }
        newToy.inStock = true
        try {
            await this.props.addToy(newToy)
            this.props.history.push('/toy')
        } catch (err) {
            throw err
        }
    }

    render() {
        const { newToy } = this.state
        return (
            <form className="add-form" onSubmit={this.onSubmitForm}>
                <TextField id="standard-basic" label="name" className="name" name="name" value={newToy.name} onChange={this.handleChange} />
                <TextField id="standard-basic" label="type" className="type" name="type" value={newToy.type} onChange={this.handleChange} />
                <TextField type="number" id="standard-basic" label="price" className="price" name="price" value={newToy.price} onChange={this.handleChange} />
                <ButtonGroup size="small" aria-label="small outlined secondary button group">
                    <Button type="submit">Add new toy</Button>
                    <Button type="reset">Reset form</Button>
                </ButtonGroup>
            </form>
        )
    }
}


const mapDispatchToProps = {
    addToy
}

export const AddToy = connect(null, mapDispatchToProps)(_AddToy)