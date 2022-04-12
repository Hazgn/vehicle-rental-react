import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Main from '../../components/Main'

import { useDispatch, useSelector } from 'react-redux'

import profileDefaultImg from '../../assets/img/profile-default.png'
import pencilIcon from '../../assets/svg/pencil.svg'

const EditProfile = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const [showImg, setShowImg] = useState(profileDefaultImg)
    const [imgFile, setImgFile] = useState('')
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [selectGender, setSelectGender] = useState('')
    const [userDob, setUserDob] = useState('')
    const [userAddress, setUserAddress] = useState('')
    const [userPhone, setUserPhone] = useState('')

    const { auth } = state
    const { token, userData } = auth

    const { active_year, address, dob, email, gender, image, name, phone } = userData

    useEffect(() => {
        if (name !== null) setUserName(name)
        if (gender === 'male') setSelectGender(1)
        if (gender === 'female') setSelectGender(2)
        if (gender === 'confidential') setSelectGender(3)
        if (image !== null) setShowImg(`${process.env.REACT_APP_HOST}/${image}`)
        if (dob !== null) setUserDob(dob)
        if (address !== null) setUserAddress(address)
        setUserEmail(email)
        setUserPhone(phone)
    }, [address, dob, email, gender, image, name, phone])

    const imageHandler = (e) => {
        const fileImg = e.target.files[0]
        setShowImg(URL.createObjectURL(fileImg))
        setImgFile(fileImg)
    }

    const saveHandler = () => {
        const body = new FormData()
        body.append('name', userName)
        body.append('email', userEmail)
        body.append('phone', userPhone)
        body.append('gender_id', selectGender)
        body.append('dob', userDob)
        body.append('address', userAddress)
        body.append('image', imgFile)
        for (var pair of body.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
    }

    const cancelHandler = () => {
        if (name !== null) setUserName(name)
        if (gender === 'male') setSelectGender(1)
        if (gender === 'female') setSelectGender(2)
        if (gender === 'confidential') setSelectGender(3)
        if (image !== null) {
            setShowImg(`${process.env.REACT_APP_HOST}/${image}`)
        } else {
            setShowImg(profileDefaultImg)
        }
        if (dob !== null) setUserDob(dob)
        if (address !== null) setUserAddress(address)
        setUserEmail(email)
        setUserPhone(phone)
    }


    return (
        <Main>
            <main className='container' style={{ marginBottom: 220 }}>
                <h1 className={styles['profile-font']}>Profile</h1>
                <section className={styles['profile-edit']}>
                    <div>
                        <img src={showImg} alt='avatar' className={styles['photo-profile']}
                            onError={e => {
                                e.onError = null
                                setShowImg(profileDefaultImg)
                            }} />
                        <div className={styles['box-pencil']}>
                            <input type={'file'} style={{ position: 'absolute', width: 46, height: 46, zIndex: 3, opacity: 0 }} onChange={e => imageHandler(e)} />
                            <img src={pencilIcon} alt='avatar' style={{ width: 16, height: 17 }} />
                        </div>
                    </div>

                    <div className={styles['user-data']}>
                        <h1 className={styles['user-name']}>{name === null || name === '' ? 'No Name' : name}</h1>
                        <p className={styles['info-data']}>{email}</p>
                        <p className={styles['info-data']}>{phone === null || phone === '' ? 'No Phone' : phone}</p>
                        <p className={styles['info-data']}>{`Has been active since ${active_year}`}</p>
                    </div>
                </section>

                <section className={styles['form-gender']}>
                    <label className={styles['gender']}>
                        <div className={styles['radio-orange-male']}>
                            <input type={'radio'} checked='checked' name='radio' className={styles['select-gender']} onChange={() => setSelectGender(1)} />
                            <span className={styles['check-mark']} />
                            <p id={styles['male-text']}>Male</p>
                        </div>
                    </label>
                    <label className={styles['gender']}>
                        <div className={styles['radio-orange-female']}>
                            <input type={'radio'} checked='checked' name='radio' className={styles['select-gender']} onChange={() => setSelectGender(2)} />
                            <span className={styles['check-mark']} />
                            <p id={styles['female-text']}>female</p>
                        </div>
                    </label>
                </section>

                <section style={{ position: 'relative', top: 154 }}>
                    <section className='container'>
                        <div className={styles['contacts-edit']}>
                            <h5 className={styles['contacts']}>Contacts</h5>
                            <label className={styles['label']}>Email address : </label>
                            <input type={'email'} className={styles['input-contacts']} value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                            <label className={styles['label']} style={{ marginTop: 53 }}>Address : </label>
                            <input type={'text'} className={styles['input-contacts']} value={userAddress} onChange={e => setUserAddress(e.target.value)} />
                            <label className={styles['label']} style={{ marginTop: 53 }}>Mobile number : </label>
                            <input type={'number'} className={styles['input-contacts']} value={userPhone} onChange={e => setUserPhone(e.target.value)} />
                        </div>
                        <div className={styles['contacts-edit']} style={{ marginTop: 53 }}>
                            <h5 className={styles['contacts']}>Identity</h5>
                            <div className={styles['identity-edit']}>
                                <label className={styles['label']}>Display name : </label>
                                <label className={styles['large-date']}>DD/MM/YY</label>
                                <input type={'text'} className={styles['input-identity']} value={userName} onChange={e => setUserName(e.target.value)} />
                                <input type={'date'} className={styles['input-identity']} value={userDob} onChange={e => setUserDob(e.target.value)} />
                            </div>
                            <div className={styles['select-button']}>
                                <button className={styles['btn-save-change']} onClick={saveHandler}>Save Change</button>
                                <button className={styles['btn-edit-password']}>Edit Password</button>
                                <button className={styles['btn-cancel']} onClick={cancelHandler}>Cancel</button>
                            </div>
                        </div>
                    </section>

                </section>
            </main>
        </Main>
    )
}

export default EditProfile