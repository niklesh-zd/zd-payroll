import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AddEmployee = () => {
  const [id, idchange] = useState('')
  const [name, namechange] = useState('')
  const [email, emailchange] = useState('')
  const [phone, phonechange] = useState('')
  const [active, activechange] = useState(true)
  const [validation, valchange] = useState(false)

  const navigate = useNavigate()

  const handlesubmit = (e) => {
    e.preventDefault()
    const empdata = { name, email, phone, active, id }
    fetch('http://192.168.29.37:7071/emp/post_some_data', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert('Saved successfully.')
        console.log({ res }, '==============babu')
        navigate('/settings/manageprofile')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <div>
      <div className="row">
        <div className="offset-lg-2 col-lg-8">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card p-10">
              <div className="card-title" style={{ textAlign: 'center' }}>
                <h2 className="text-red-900">Apply Leave</h2>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>Start Date Of Leave</label>
                    <input
                      type="date"
                      min="2"
                      max="50"
                      name=""
                      //   value={fields.STREAM}
                      //   onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>End Day Of Leave</label>
                    <input
                      type="date"
                      min="2"
                      max="50"
                      name=""
                      //   value={fields.STREAM}
                      //   onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    &nbsp;{' '}
                    <p> Reason For Leave</p>
                    &nbsp;{' '}
                    <input
                      type="radio"
                      id="medical_l"
                      name="leave_reason"
                      defaultValue="medical_l"
                    />
                    &nbsp; <label htmlFor="medical_l">Medical Leave</label>
                    &nbsp;{' '}
                    <input
                      type="radio"
                      id="family_r"
                      name="leave_reason"
                      defaultValue="family_r"
                    />
                    &nbsp; <label htmlFor="family_r">Family Reason</label>
                    &nbsp;{' '}
                    <input
                      type="radio"
                      id="personal_l"
                      name="leave_reason"
                      defaultValue="personal_l"
                    />
                    &nbsp; <label htmlFor="personal_l">Personal Leave</label>
                    &nbsp;{' '}
                    <input
                      type="radio"
                      id="other_r"
                      name="leave_reason"
                      defaultValue="other_r"
                    />
                    &nbsp; <label htmlFor="other_r">Other Reason</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group pt-8">
                    <label>Total Days Of Request</label>
                    <input
                      type="number"
                      min="2"
                      max="50"
                      name=""
                      //   value={fields.STREAM}
                      //   onChange={(e) => handleChange(e)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                  <div className="submit pt-8">
                    <div className="form-group">
                      <input
                        type="submit"
                        className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btn btn-success"
                      />
                    </div>
                  </div>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddEmployee
