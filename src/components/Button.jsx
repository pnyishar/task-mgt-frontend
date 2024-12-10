function Button({
  label,
  type,
  className,
  LeftIcon,
  RightIcon,
  iconSize,
  disabled,
  onClick,
}) {
  return (
    <div className="mt-8">
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="flex space-x-2 items-center justify-center">
          {LeftIcon && (
            <img src={LeftIcon} alt="left arrow" className={iconSize} />
          )}
          {label && <div>{label}</div>}
          {RightIcon && (
            <img src={RightIcon} alt="right arrow" className={iconSize} />
          )}
        </div>
      </button>
    </div>
  )
}

export default Button
