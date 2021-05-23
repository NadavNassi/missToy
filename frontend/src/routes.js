import { Dashboard } from './pages/Dashboard.jsx'
import { Home } from './pages/Home.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToysApp } from './pages/ToysApp.jsx'
import { LoginUser } from './pages/LoginUser.jsx'
import { SignupUser } from './pages/SignupUser.jsx'
import { AddToy } from './pages/AddToy.jsx'

export const routes = [
    {
        path: '/toy/details/:toyId',
        component: ToyDetails
    },
    {
        path: '/toy/edit/:toyId',
        component: ToyEdit
    },
    {
        path: '/toy/charts',
        component: Dashboard
    },
    {
        path: '/add',
        component: AddToy
    },
    {
        path: '/login',
        component: LoginUser
    },
    {
        path: '/signup',
        component: SignupUser
    },
    {
        path: '/toy',
        component: ToysApp
    },
    {
        path: '/',
        component: Home,
    },
]