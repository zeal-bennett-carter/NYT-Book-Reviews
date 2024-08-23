
import { Link } from "react-router-dom"

export default function InvalidURL() {

    return(
        <div className="inner-content-holder">
            <h2>
            This is an invalid url
            </h2>
            <div>
                <Link className="return-button" to="/">Return Home</Link>
            </div>
        </div>

    )
};