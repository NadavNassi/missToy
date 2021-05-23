import { Button } from "@material-ui/core";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ToyList } from '../cmps/ToyList'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { loadToys, addToy, remove } from '../store/actions/toy.action.js'


class _ToysApp extends Component {

    componentDidMount() {
        this.props.loadToys()
    }

    onAddToy = () => {
        const toy = {
            name: prompt('toy name'),
            price: prompt('toy price'),
            type: prompt('toy type'),
            inStock: true,
            updatedAt: Date.now(),
            createdAt: Date.now()
        }
        this.props.addToy(toy)
    }

    onRemoveToy = (toyId) => {
        this.props.remove(toyId)
    }


    render() {
        const { toys, user } = this.props
        if (!toys) return <div>Loading...</div>
        return (
            <section className="toy-app">
                {user && user.isAdmin &&
                    <Button><Link to={`/add`}>Add toy</Link></Button>}
                <ToyFilter />
                <ToyList toys={toys} onRemove={this.onRemoveToy} setSelectedToy={this.setSelectedToy} />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys,
        user: state.userModule.user
    }
}

const mapActionToProps = {
    loadToys,
    addToy,
    remove,
}

export const ToysApp = connect(mapStateToProps, mapActionToProps)(_ToysApp)