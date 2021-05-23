

import { Component } from 'react'
import { connect } from 'react-redux'
import { Doughnut, Bar } from 'react-chartjs-2'
import { loadToys } from '../store/actions/toy.action.js'

class _Dashboard extends Component {

    state = {
        isBar: false
    }

    componentDidMount() {
        this.props.loadToys()
    }

    setDataByType = () => {
        const labels = this.setLabelsByType()
        return {
            labels: Object.keys(labels),
            datasets: [
                {
                    label: '# of Votes',
                    data: Object.values(labels),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 4,
                },
            ],
        };
    }

    setLabelsByType = () => {
        const labels = this.props.toys.reduce((acc, toy) => {
            acc[toy.type] = !acc[toy.type] ? 1 : acc[toy.type] + 1
            return acc
        }, {})
        return labels
    }

    setDataByYear = () => {
        const labels = this.setLabelsByYear()
        return {
            labels: Object.keys(labels),
            datasets: [
                {
                    label: '# of Votes',
                    data: Object.values(labels),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 4,
                },
            ],
        };
    }

    setLabelsByYear = () => {
        const labels = this.props.toys.reduce((acc, toy) => {
            const year = new Date(toy.createdAt).getFullYear()
            acc[year] = !acc[year] ? 1 : acc[year] + 1
            return acc
        }, {})
        return labels
    }

    onToggleChart = () => {
        this.setState({ isBar: !this.state.isBar })
    }




    render() {
        const { toys } = this.props
        if (!toys) return <div>Loading...</div>
        const { isBar } = this.state
        return (
            <section className="dasboard">
                <button onClick={this.onToggleChart}>Show by {isBar ? 'category' : 'year'}</button>

                <div>
                    {!isBar && <Doughnut width={300} height={300} options={{ maintainAspectRatio: false }} data={this.setDataByType()} />}
                    {isBar && <Bar width={300} height={300} options={{ maintainAspectRatio: false }} data={this.setDataByYear()} />}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys
    }
}

const mapDispatchToProps = {
    loadToys
}

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)
