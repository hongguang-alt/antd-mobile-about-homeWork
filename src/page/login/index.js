import React, { useState, useEffect } from 'react'
import { Card, WingBlank, WhiteSpace, List, InputItem, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { login } from '../../axios/api'

const styles = {
    errInfo: {
        textAlign: 'center',
        color: 'red',
        marginTop: '.5rem'
    },
    login: {
        width: '100%',
        color: '#108ee9',
        textAlign: 'center',
        marginTop: '.5rem'
    },
    title: {
        marginTop: '30%',
        color: 'white',
        textAlign: 'center',
        fontSize: '1rem'
    },
    bottomTitle: {
        position: "absolute",
        bottom: '1rem',
        textAlign: 'center',
        left: 0,
        right: 0,
        margin: 'auto'
    }
}

const Login = (props) => {
    const [loading, setLoading] = useState(false)
    const [errorInfo, setErrorInfo] = useState('')
    const { getFieldProps } = props.form

    useEffect(() => {
        if (loading) {
            Toast.loading('Loading...', 0);
        } else {
            if (Toast) Toast.hide()
        }
    }, [loading])

    const onFinish = () => {
        const form = props.form
        form.validateFields(async (err, value) => {
            //错误处理
            if (err) {
                let errList = []
                Object.keys(err).map(item => {
                    const { errors } = err[item]
                    errList = [...errList, ...errors]
                })
                setErrorInfo(errList[0].message)
                return
            }
            try {
                setErrorInfo('')
                setLoading(true)
                const { status, msg, token } = await login(value)
                if (status === '201') {
                    setLoading(false)
                    setErrorInfo(msg)
                } else {
                    setErrorInfo('')
                    setLoading(false)
                    window.localStorage.setItem('token', token)
                    props.history.push('/upload')
                }
            } catch (e) {
                console.log(e)
            }
        })
    }
    return <div className='login'>
        <div style={styles.title}>作业上交系统</div>
        <WingBlank size="lg" style={{
            marginTop: '1rem'
        }}>
            <WhiteSpace size="lg" />
            <Card>
                <Card.Header
                    title="登陆"
                />
                <Card.Body>
                    <List>
                        <InputItem
                            {...getFieldProps('sid', {
                                rules: [{
                                    required: true,
                                    message: '请输入你的学号！',
                                }]
                            })}
                            placeholder="请输入你的学号"
                        >学号</InputItem>
                        <InputItem
                            {...getFieldProps('password', {
                                rules:
                                    [
                                        {
                                            required: true,
                                            message: '请输入你的密码！',
                                        },
                                    ]
                            })}
                            type="password"
                            placeholder="请输入你的密码"
                        >密码</InputItem>
                    </List>
                    {
                        errorInfo ? <div style={styles.errInfo}>{errorInfo}</div> : null
                    }
                    <List.Item>
                        <div
                            style={styles.login}
                            onClick={() => onFinish()}
                        >
                            登陆
                        </div>
                    </List.Item>
                </Card.Body>
            </Card>
            <WhiteSpace size="lg" />
        </WingBlank>
        <div style={styles.bottomTitle}>@网络工程171</div>
    </div>
}

export default createForm()(Login);