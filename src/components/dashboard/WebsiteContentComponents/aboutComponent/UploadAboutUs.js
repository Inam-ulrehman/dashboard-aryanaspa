import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  getAboutUsValues,
  uploadAboutUsThunk,
} from '../../../../features/aboutUs/aboutUsSlice'
import FormInput from '../../../FormInput'

const UploadAboutUs = () => {
  const dispatch = useDispatch()
  const { aboutUs } = useSelector((state) => state)
  const { name, profession, paragraph, uploadImage } = aboutUs
  const handleSubmit = (e) => {
    e.preventDefault()
    if (uploadImage.length === 0) {
      return toast.warning('please upload Image First.')
    }
    if ((!name, !profession, !paragraph)) {
      return toast.warning('please enter all details.')
    }
    dispatch(uploadAboutUsThunk(aboutUs))
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    dispatch(getAboutUsValues({ name, value }))
  }
  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <FormInput name='name' value={name} onChange={handleChange} />
        </div>
        {/* Profession */}
        <div>
          <FormInput
            name='profession'
            value={profession}
            onChange={handleChange}
          />
        </div>
        {/* paragraph */}
        <div>
          <label htmlFor='paragraph'>
            <textarea
              name='paragraph'
              id='paragraph'
              cols='40'
              rows='10'
              value={paragraph}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <button onClick={handleSubmit} className='btn'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default UploadAboutUs
