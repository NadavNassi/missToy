import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateToy } from '../store/actions/toy.action.js'

import { toyService } from '../services/toy.service.js'


class _ToyEdit extends Component {
    state = {
        toy: null
    }

    componentDidMount() {
        const { toyId } = this.props.match.params
        toyService.getById(toyId)
            .then(toy => {
                this.setState({ toy })
            })
    }


    handleChange = ({ target }) => {
        const field = target.name
        if (field === 'inStock') {
            this.setState(prevState => ({
                ...prevState,
                toy: {
                    ...prevState.toy,
                    [field]: !this.state.toy.inStock
                }
            }))
            return
        }
        const value = target.name === 'price' ? +target.value : target.value
        this.setState(prevState => ({
            toy: {
                ...prevState.toy,
                [field]: value
            }
        }))
    }

    onSubmitForm = (ev) => {
        ev.preventDefault()
        const { toy } = this.state
        toy.updatedAt = Date.now()
        this.props.updateToy(toy)
        this.onCloseEdit()
    }

    onCloseEdit = () => {
        this.props.history.push('/toy')
    }

    render() {
        const { toy } = this.state
        if (!toy) return <div>Loading...</div>
        const { name, price, type, inStock } = toy
        return (
            <section className="toy-edit">
                <Link to='/toy'>Go back without saving</Link>
                <form className="toy-edit-form" onSubmit={this.onSubmitForm}>
                    <TextField id="standard-basic" label="name" className="name" name="name" value={name} onChange={this.handleChange} />
                    <TextField id="standard-basic" label="type" className="type" name="type" value={type} onChange={this.handleChange} />
                    <TextField type="number" id="standard-basic" label="price" className="price" name="price" value={price} onChange={this.handleChange} />
                    <FormControlLabel
                        control={<Checkbox color="primary" onChange={this.handleChange} name="inStock" checked={inStock && true} />}
                        name="inStock"
                        label="In stock"
                        labelPlacement="start"
                    />
                    <ButtonGroup size="small" aria-label="small outlined secondary button group">
                        <Button type="submit">Save changes</Button>
                    </ButtonGroup>
                </form>

            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        selectedToy: state.toyModule.selectedToy
    }
}

const mapDispatchToProps = {
    updateToy
}

export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit)
