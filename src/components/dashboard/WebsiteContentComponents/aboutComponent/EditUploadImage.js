import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { updateAboutUsImageThunk } from '../../../../features/aboutUs/editAboutUsSlice'

const EditUploadImage = () => {
  const dispatch = useDispatch()
  const { _id } = useSelector((state) => state.editAboutUs)
  const [file, setFile] = useState(null)

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  // handle Submit

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) {
      return toast.warning('Please Chose a file.')
    }
    const formData = new FormData()
    formData.append('file', file)

    dispatch(updateAboutUsImageThunk({ formData, _id }))
    setFile(null)
  }

  return (
    <Wrapper>
      <div className='file-upload-container'>
        <input
          type='file'
          className='custom-file-input'
          onChange={handleChange}
        />
        <button className='btn' type='submit' onClick={handleSubmit}>
          Change Picture
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div``
export default EditUploadImage
