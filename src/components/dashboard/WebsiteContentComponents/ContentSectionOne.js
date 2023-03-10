import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../../../utils/axios'
import {
  getItemFromLocalStorage,
  getUserFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '../../../utils/localStorage'
import FormInput from '../../FormInput'
import UploadImage from '../../UploadImage'

const LocalStorageUploadImage = getItemFromLocalStorage('sectionOneImage')

const initialState = {
  _id: 0,
  heading: '',
  buttonTitle: '',
  paragraph: '',
  uploadImage: LocalStorageUploadImage || [],
  fetchData: false,
  isLoading: false,
}
const ContentSectionOne = () => {
  const [state, setState] = useState(initialState)

  // ====Handle Submit ====
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (state.uploadImage.length <= 0) {
      return toast.error('please upload image first.')
    }
    if ((!state.heading, !state.buttonTitle, !state.paragraph)) {
      return toast.error('Please fill all fields.')
    }
    setState({ ...state, isLoading: true })
    const user = getUserFromLocalStorage()
    try {
      const result = await customFetch.post('/sectionOne', state, {
        headers: {
          Authorization: `Bearer ${user?.token} `,
        },
      })
      console.log(result)
      setState({ ...state, isLoading: false, fetchData: !state.fetchData })
      removeItemFromLocalStorage('sectionOneImage')

      toast.success(result.statusText)
    } catch (error) {
      setState({ ...state, isLoading: false })
      console.log(error)
    }
  }
  // ====handle Change=====

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setState({ ...state, [name]: value })
  }
  // ======cb Function======
  const cbFunction = async (result) => {
    const name = 'sectionOneImage'
    const uploadImage = result.data.sectionOne.uploadImage
    if (state._id === 0) {
      setItemInLocalStorage(name, uploadImage)
    }
    setState({ ...state, uploadImage: result.data.sectionOne.uploadImage })
  }

  // =====fetch Data=====

  const fetchData = async () => {
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch('/sectionOne')

      if (result.data.msg === 'folder is empty.') {
        setState({ ...state, isLoading: false })
        return
      }
      const data = result?.data?.sectionOne
      setState({ ...state, ...data, isLoading: false })
    } catch (error) {
      setState({ ...state, isLoading: false })
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()

    // eslint-disable-next-line
  }, [state.fetchData])
  if (state.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      <strong className='top'>Section -1</strong>
      <div className='top-image'>
        <img src={state.uploadImage[0]?.secure_url} alt='' />
      </div>
      <div className='box'>
        <strong>Step-1. </strong>
        <p>Upload your Image</p>
      </div>
      <hr />
      <div className='upload-image'>
        <UploadImage
          path={`/sectionOne/${state._id}`}
          cbFunction={cbFunction}
          state={state}
          setState={setState}
        />
      </div>
      <hr />
      <div className='box'>
        <strong>Step-2. </strong>
        <p>Fill details below and submit.</p>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <div className='box-1'>
          {/* heading  */}
          <div>
            <FormInput
              label={'Heading'}
              name={'heading'}
              value={state.heading}
              onChange={handleChange}
            />
          </div>
          {/* Button Title  */}
          <div>
            <FormInput
              label={'Button Title'}
              name={'buttonTitle'}
              value={state.buttonTitle}
              onChange={handleChange}
            />
          </div>
          {/* desktop Image */}
          <div>
            <FormInput
              label={'Desktop Image Link'}
              name={'desktopImage'}
              value={state.uploadImage[0]?.secure_url}
              onChange={handleChange}
              disabled
            />
          </div>

          <button type='submit' className='btn'>
            Submit
          </button>
        </div>
        {/* =============Box divider============= */}
        <div className='box-2'>
          {/* paragraph */}
          <div className='paragraph'>
            <label className='form-label' htmlFor='paragraph'>
              Paragraph
            </label>
            <textarea
              className='form-input'
              name='paragraph'
              id='paragraph'
              cols='30'
              rows='10'
              value={state.paragraph}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .top {
    position: absolute;
    right: 5%;
  }
  .top-image {
    max-width: 135px;
    max-height: 135px;
    position: absolute;
    right: 10%;
    top: 28%;
    img {
      width: 100%;
    }
  }
  .box {
    display: flex;
    p {
      margin: 0;
      margin-left: 1rem;
    }
  }
  .upload-image {
    height: 120px;
  }
  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    max-width: 80vw;
  }
`
export default ContentSectionOne
