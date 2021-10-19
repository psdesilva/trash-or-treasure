import buttonStyle from '../styles/Button.module.css'

const Button = ({ text, navBar, onClick }) => {
    return (
        <button onClick={onClick} className={navBar ? buttonStyle.navBarBtn : buttonStyle.btn}>
            {text}
        </button>
    )
}

export default Button
