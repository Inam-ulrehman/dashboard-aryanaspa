import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../utils/axios'
import { getUserFromLocalStorage } from '../utils/localStorage'

const UploadImage = ({ path, cbFunction, state, setState }) => {
  const [file, setFile] = useState(null)

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  // handle Submit

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      return toast.warning('Please Chose a file.')
    }
    setState({ ...state, isLoading: true })
    const user = getUserFromLocalStorage()
    try {
      const formData = new FormData()
      formData.append('file', file)
      setFile(null)
      const result = await customFetch.post(`${path}`, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      setState({ ...state, isLoading: false })
      cbFunction(result)
      toast.success('Image Updated.')
      return
    } catch (error) {
      setState({ ...state, isLoading: false })
      toast.error('Image is not uploaded.')
      console.log(error)
    }
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
          upload Image
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div``
export default UploadImage
