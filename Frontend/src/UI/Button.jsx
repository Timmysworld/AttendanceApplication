const Button = ({children, textOnly, className, ...props}) => {
    let classess = textOnly ? 'text-button': 'button';
    classess += ' ' + className;
    return (
        <button className={classess}{...props}>
            {children}
        </button>
    )
}

export default Button