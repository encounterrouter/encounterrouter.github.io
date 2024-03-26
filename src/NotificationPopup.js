import './NotificationPopup.css'

function NotificationPopup(props) {
    return (
        <div className="notificationPopup">
            <div style={{margin:'20px'}}>{props.copy}</div>
            <button onClick={() => props.setIsNotificationOpen(false)}>Okay</button>
        </div>
    )
}

export default NotificationPopup;