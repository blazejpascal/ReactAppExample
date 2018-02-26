import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import PropTypes from 'prop-types'
import styles from './UserData.scss'


const UserData = (props) => {
  const {userName, userCity, userAge, userSite} = props

  return (
    <div className={styles['user-data__container']}>
      <div className={styles['user-data__photo']}>
        <span>foto</span>
      </div>
      <div className={styles['user-data__data']}>
        <span className={styles['user-data__data--name']}>{userName} </span>
        <span className={styles['user-data__data--rest-data']}> {userCity}</span>
        <span className={styles['user-data__data--rest-data']}> {userAge}</span>
        <span className={styles['user-data__data--rest-data']}> {userSite}</span>
      </div>
    </div>
  )
}

UserData.defaultProps = {
  userName: 'Jack Jackowski',
  userCity: 'Wrocław',
  userAge: '26 lat',
  userSite: 'htpp://jack-jackowski.pl',
}

UserData.propTypes = {
  userName: PropTypes.string,
  userCity: PropTypes.string,
  userAge: PropTypes.string,
  userSite: PropTypes.string,
}


export default withStyles(UserData)
