import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"

export default function QouteSection(){
    return (
        <div className="section quote">
            <p className="qoute-text"><FontAwesomeIcon icon={faQuoteLeft} />The most powerful social media... it is not the internet, it is not facebook - it is food. This connects all human beings</p>
        </div>
    )
}