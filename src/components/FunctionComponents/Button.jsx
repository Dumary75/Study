

export default function Button({ children, textOnly, className, ...probs }) {
    let cssClasses = textOnly ? 'text-button' : 'button';
    cssClasses += ' ' + className;

    return (
        <button className={cssClasses} {...probs}>
            {children}
        </button>
    )

}