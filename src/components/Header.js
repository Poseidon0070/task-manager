import img from "../images/notebook.gif"
import styles from './Header.module.css'

let Header = () => {
    return (
        <div className={`${styles['header']} bg-warning` }>
            <div className=" mt-4 ms-5 d-flex">
            <img src={img} style={{height:"50px"}} className="rounded" alt="..."></img>
                <p className="h1 ms-2 text-danger font-monospace fw-bold">Keeper</p>
            </div>
        </div>
    )
}

export default Header;