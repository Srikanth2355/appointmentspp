// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {list, starclick} = props
  const {id, title, date, isstared} = list
  const updateddate = format(new Date(date), 'dd MMMM yyyy,EEEE')
  const clicked = () => {
    starclick(id)
  }
  const imagesrc = isstared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="individualcontainer">
      <div className="upperrow">
        <h3 className="listtitle">{title}</h3>
        <button
          type="button"
          className="starbutton"
          testid="star"
          onClick={clicked}
        >
          <img src={imagesrc} className="starimage" alt="star" />
        </button>
      </div>
      <div className="downrow">Date:{updateddate}</div>
    </li>
  )
}

export default AppointmentItem
