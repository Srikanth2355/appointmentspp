// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const firstlist = []

class Appointments extends Component {
  state = {
    titleinput: '',
    dateinput: '',
    initiallist: firstlist,
    starred: false,
  }

  inputtitle = e => {
    this.setState({titleinput: e.target.value})
  }

  inputdate = e => {
    this.setState({dateinput: e.target.value})
  }

  submitdata = e => {
    e.preventDefault()
    const {titleinput, dateinput} = this.state
    const newlist = {
      id: uuidv4(),
      title: titleinput,
      date: dateinput,
      isstared: false,
    }
    this.setState(prevState => ({
      initiallist: [...prevState.initiallist, newlist],
      titleinput: '',
      dateinput: '',
    }))
  }

  clicked = id => {
    this.setState(prevState => ({
      initiallist: prevState.initiallist.map(eachlist => {
        if (eachlist.id === id) {
          return {...eachlist, isstared: !eachlist.isstared}
        }
        return eachlist
      }),
    }))
  }

  showstaredlist = () => {
    const {starred} = this.state

    this.setState({starred: !starred})
  }

  render() {
    const {titleinput, dateinput, initiallist, starred} = this.state
    let filteredlist
    if (starred) {
      filteredlist = initiallist.filter(eachlist => eachlist.isstared === true)
    } else {
      filteredlist = initiallist
    }
    const addclass = starred ? 'addbackground' : ''
    return (
      <div className="container">
        <div className="innercontainer">
          <h1 className="heading">Add Appointment</h1>
          <div className="formcontainer">
            <div className="form">
              <form className="appointmentform" onSubmit={this.submitdata}>
                <label htmlFor="title" className="titlelabel">
                  TITLE
                </label>
                <br />
                <input
                  type="text"
                  className="title"
                  id="title"
                  placeholder="Title"
                  value={titleinput}
                  onChange={this.inputtitle}
                />
                <br />
                <label htmlFor="date" className="datelabel">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  className="date"
                  onChange={this.inputdate}
                  value={dateinput}
                />
                <br />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <div className="imagecontainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="sideimage"
              />
            </div>
          </div>
          <div className="headingdiv">
            <h3 className="appointmentheading">Appointments</h3>
            <button
              type="button"
              className={`starredbutton ${addclass}`}
              onClick={this.showstaredlist}
            >
              Starred
            </button>
          </div>
          <ul className="listcontainer">
            {filteredlist.map(eachlist => (
              <AppointmentItem
                list={eachlist}
                key={eachlist.id}
                starclick={this.clicked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
