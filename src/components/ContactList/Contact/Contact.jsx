import styles from './Contact.module.css'
import { IoPersonSharp } from "react-icons/io5"
import { FaPhoneAlt} from 'react-icons/fa'

export default function Contact({data: {name, number, id}, onDelete}) {
    return (
        <li className={styles.list}>
            <div>
                <p className={styles.textbox}><IoPersonSharp size='18'/>{name}</p>
                <p className={styles.textbox}><FaPhoneAlt size='17'/>{number}</p>
            </div>
            <button type="button" onClick={() => {onDelete(id)}}>Delete</button>
        </li>
    )
}
