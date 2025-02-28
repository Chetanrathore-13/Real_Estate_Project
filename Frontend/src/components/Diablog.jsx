function Dialog({ isOpen, onClose, title, description, actions }) {
    if (!isOpen) return null
  
    return (
      <div className="dialog-overlay" onClick={onClose}>
        <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
          <div className="dialog-header">
            <h2>{title}</h2>
            <p className="text-muted">{description}</p>
          </div>
          <div className="dialog-footer">{actions}</div>
        </div>
      </div>
    )
  }
  
  export default Dialog
  
  