import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../component/FormContainer'
import { getUserDetails, updateUser } from '../action/userAction'
import { USER_UPDATE_RESET } from '../constant/userConstant'
import { useNavigate, useParams } from 'react-router-dom'

function UserEditScreen() {

    const { userId } = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    const navigate = useNavigate()
    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } else {

            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [user, userId, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
    }

    return (
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <h1>Loading</h1>}
                {errorUpdate && <h2 variant='danger'>{errorUpdate}</h2>}

                {loading ? <h1>Loading</h1> : error ? <h2 variant='danger'>{error}</h2>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name' className='mb-3'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email' className='mb-5'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isadmin' className='mb-3'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='primary' className='my-3'>
                                Update
                            </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default UserEditScreen