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

const LocalStorageUploadImage = getItemFromLocalStorage('sectionTwoImage')

const initialState = {
  _id: 0,
  heading: '',
  buttonTitle: '',
  paragraph: '',
  uploadImage: LocalStorageUploadImage || [],
  fetchData: false,
  isLoading: false,
}
const ContentSectionTwo = () => {
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
      const result = await customFetch.post('/sectionTwo', state, {
        headers: {
          Authorization: `Bearer ${user?.token} `,
        },
      })
      console.log(result)
      setState({ ...state, isLoading: false, fetchData: !state.fetchData })
      removeItemFromLocalStorage('sectionTwoImage')

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
    const name = 'sectionTwoImage'
    const uploadImage = result.data.sectionTwo.uploadImage
    if (state._id === 0) {
      setItemInLocalStorage(name, uploadImage)
    }
    setState({ ...state, uploadImage: result.data.sectionTwo.uploadImage })
  }

  // =====fetch Data=====

  const fetchData = async () => {
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch('/sectionTwo')

      if (result.data.msg === 'folder is empty.') {
        setState({ ...state, isLoading: false })
        return
      }
      const data = result?.data?.sectionTwo
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
      <h3>Section-2</h3>
      <UploadImage
        path={`/sectionTwo/${state._id}`}
        cbFunction={cbFunction}
        state={state}
        setState={setState}
      />
      <form className='form' onSubmit={handleSubmit}>
        {/* heading  */}
        <div>
          <FormInput
            label={'Heading'}
            name={'heading'}
            value={state.heading}
            onChange={handleChange}
          />
        </div>
        {/* paragraph */}
        <div>
          <FormInput
            label={'Paragraph'}
            name={'paragraph'}
            value={state.paragraph}
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
      </form>
      <div>
        <img src={state.uploadImage[0]?.secure_url} alt='' />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div``
export default ContentSectionTwo
