
import { Link } from "react-router-dom"

export default function InvalidURL() {

    return(
        <div>
            <h2>
            This is an invalid url
            </h2>
            <div>
                <Link to="/">Return Home</Link>
            </div>
        </div>

    )
};