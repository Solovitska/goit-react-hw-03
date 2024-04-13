import styles from './SearchBox.module.css'
import { useId } from 'react'

export default function SearchBox({ searchValue, handleChange }) {
    const id = useId()
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={id}>Find contacts by name
                <input className={styles.searchInput} type="text" name="search" id={id} value={searchValue} onChange={(e) => { handleChange(e.target.value) }} />
            </label>
        </div>
    )
}