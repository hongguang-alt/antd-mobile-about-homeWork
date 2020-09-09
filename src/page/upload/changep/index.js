import React, { useState } from 'react'
import { Card, WingBlank, WhiteSpace, List, InputItem, Toast, NavBar } from 'antd-mobile';
import { createForm } from 'rc-form';
import { password } from '../../../axios/api'

const styles = {
    errInfo: {
        textAlign: 'center',
        color: 'red',
        marginTop: '.5rem'
    },
    check: {
        width: '100%',
        color: '#108ee9',
        textAlign: 'center',
        marginTop: '.5rem'
    },
    titleTop: {
        position: 'fixed',
        top: 0,
        zIndex: 99,
        width: '100%'
    }
}

const Changep = (props) => {
    const [errorInfo, setErrorInfo] = useState('')
    const { getFieldProps, getFieldValue } = props.form

    const onFinish = () => {
        const form = props.form
        form.validateFields(async (err, value) => {
            //错误处理
            if (err) {
                let errList = []
                Object.keys(err).forEach(item => {
                    const { errors } = err[item]
                    errList = [...errList, ...errors]
                })
                setErrorInfo(errList[0].message)
                return
            }
            setErrorInfo('')
            getPassword(value)
            try {
                await form.resetFields()
            } catch (e) {
                console.log(e)
            }
        })
    }

    //调用修改密码的接口
    const getPassword = async (values) => {
        try {
            let { status, msg } = await password(values)
            if (status == '200') {
                Toast.success('修改成功')
            } else {
                Toast.fail(msg)
            }
        } catch (e) {
            Toast.fail('修改密码接口请求失败')
        }
    }

    return <>
        <NavBar
            mode="light"
            style={styles.titleTop}
        >修改密码</NavBar>
        <WingBlank size="lg" style={{
            marginTop: '2rem'
        }}>
            <WhiteSpace size="lg" />
            <Card>
                <Card.Header
                    title="修改密码"
                />
                <Card.Body>
                    <List>
                        <InputItem
                            {...getFieldProps('oldPassword', {
                                rules: [{
                                    required: true,
                                    message: '请输入你的旧密码!',
                                }]
                            })}
                            type="password"
                            placeholder="请输入你的旧密码"
                        >旧密码</InputItem>
                        <InputItem
                            {...getFieldProps('newPassword', {
                                rules:
                                    [
                                        {
                                            required: true,
                                            message: '请输入你的新密码！',
                                        },
                                        {
                                            validator(rule, value, callback, source, options) {
                                                const errors = [];
                                                if (value && getFieldValue('oldPassword') === value) {
                                                    errors.push(new Error('新密码和旧密码不能相同!'))
                                                }
                                                return errors;
                                            },
                                        }
                                    ],
                            })}
                            type="password"
                            placeholder="请输入你的新密码"
                        >新密码</InputItem>
                    </List>
                    {
                        errorInfo ? <div style={styles.errInfo}>{errorInfo}</div> : null
                    }
                    <List.Item>
                        <div
                            style={styles.check}
                            onClick={() => onFinish()}
                        >
                            确定
                        </div>
                    </List.Item>
                </Card.Body>
            </Card>
            <WhiteSpace size="lg" />
        </WingBlank>
    </>
}

export default createForm()(Changep);