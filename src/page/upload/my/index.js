import React, { useEffect, useState } from 'react'
import { NavBar, Button, Card, WhiteSpace } from 'antd-mobile'
import jwt from 'jsonwebtoken'

const styles = {
    titleTop: {
        position: 'fixed',
        top: 0,
        zIndex: 99,
        width: '100%'
    }
}
const My = (props) => {
    const [name, setName] = useState('')

    useEffect(() => {
        let { name } = jwt.verify(window.localStorage.getItem('token'), 'yinxiu')
        setName(name)
    })
    const outLogin = () => {
        window.localStorage.removeItem("token")
        // props.history.push('/')
        window.location.href = "/"
    }
    return <>
        <NavBar
            mode="light"
            style={styles.titleTop}
        >我的</NavBar>
        <WhiteSpace size="lg" style={{ marginTop: '2rem' }} />
        <Card full>
            <Card.Header
                title={`欢迎你，${name}`}
            />
            <Card.Body>
                <Button
                    type='primary'
                    onClick={() => outLogin()}>退出
                </Button>
            </Card.Body>
        </Card>
    </>
}

export default My