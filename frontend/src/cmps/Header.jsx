import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logoutUser, loadUser } from '../store/actions/user.action.js'



class _Header extends Component {
    componentDidMount() {
        this.props.loadUser()
    }
    render() {
        const { user, logoutUser } = this.props
        return (
            <header className='app-header'>
                <h1>missToy</h1>
                <nav>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/toy'>Toys</NavLink>
                    <NavLink to='/toy/charts'>Charts</NavLink>
                    {!user ? <NavLink to='/login'><i className="fas fa-sign-in-alt"></i></NavLink> : <>Hello {user.fullname}!<i className="fas fa-sign-out-alt" onClick={logoutUser}></i></>}
                </nav>
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    logoutUser,
    loadUser
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)
