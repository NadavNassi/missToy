import { Link } from "react-router-dom";


export function Home() {
    return (
        <section className="home-page">
            <h1>Welcome to missToy!</h1>
            <p>this is your place to buy your favorite games</p>
            <p>Hit <Link to="/toy">toys</Link> to find your next game to play!</p>
        </section>
    )
}