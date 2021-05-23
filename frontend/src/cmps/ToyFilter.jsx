import { MenuItem, Select, TextField } from "@material-ui/core";
import { Component } from "react";
import { connect } from "react-redux";

import { loadToys } from '../store/actions/toy.action.js'


class _ToyFilter extends Component {
    state = {
        filterBy: {
            txt: '',
            inStock: 'all'
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({
            ...prevState,
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => this.onFilter())
    }

    onFilter = () => {
        this.props.loadToys(this.state.filterBy)
    }

    render() {
        const { filterBy } = this.state
        return (
            <form>
                <TextField id="standard-basic" label="Toy name" name='txt' value={filterBy.txt} onChange={this.handleChange} />
                <Select name='inStock' value={filterBy.inStock} onChange={this.handleChange}>
                    <MenuItem value='all'>All</MenuItem>
                    <MenuItem value={true}>In stock</MenuItem>
                    <MenuItem value={false}>Out of stock</MenuItem>
                </Select>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

const mapDispatchToProps = {
    loadToys
}

export const ToyFilter = connect(mapStateToProps, mapDispatchToProps)(_ToyFilter)