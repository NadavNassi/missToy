import { Link } from 'react-router-dom'
import { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


import { remove } from '../store/actions/toy.action.js'

import { toyService } from '../services/toy.service.js'
import { loadUser } from '../store/actions/user.action.js'

class _TodoDetails extends Component {
    state = {
        toy: null,
    }
    async componentDidMount() {
        // this.props.loadUser()
        const { toyId } = this.props.match.params
        try {
            const toy = await toyService.getById(toyId)
            this.setState({ toy })
        } catch (err) {
            throw err
        }
    }

    componentWillUnmount() {
        this.setState({ toy: null })
    }

    getTime = (time) => {
        const date = new Date(time)
        return `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    onRemove = async () => {
        const toyId = this.state.toy._id
        const { user } = this.props
        try {
            await this.props.remove(toyId, user)
            this.props.history.push('/toy')
        } catch (err) {
            throw err
        }
    }


    render() {
        const { user } = this.props
        const { toy } = this.state
        if (!toy) return <div>Loading...</div>
        const btns = [<Button key='edit-btn'><Link to={`/toy/edit/${toy._id}`}>Edit toy</Link></Button>, <Button key='delete-btn' onClick={this.onRemove}>Delete toy</Button>]
        return (
            <section className="toy-details">
                <div className="toy-description">
                    <p>Name: {toy.name}</p>
                    <p>Price: {toy.price}</p>
                    <p>Ceated at: {this.getTime(toy.createdAt)}</p>
                    <p>Updated at: {this.getTime(toy.updatedAt)}</p>
                    <p>In stock: {toy.inStock ? 'Yes' : 'No'}</p>
                    <ButtonGroup size="small" aria-label="small outlined secondary button group">
                        <Button onClick={() => this.props.history.push('/toy')}>Back to toys</Button>
                        {user && user.isAdmin &&
                            btns.map(btn => btn)}
                    </ButtonGroup>
                </div>
                <img src={toy.img} alt="" />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        toy: state.toyModule.selectedToy,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    remove,
    loadUser
}


export const ToyDetails = connect(mapStateToProps, mapDispatchToProps)(_TodoDetails)
