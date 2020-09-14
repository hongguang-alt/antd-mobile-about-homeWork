import React, { useState, useEffect } from 'react'
import { NavBar, Card, WingBlank, WhiteSpace, Toast, List, InputItem, Button, Modal } from 'antd-mobile'
import { noHomeWorkListName, changeFileFormat, detailList, deleteAll, deteleOne, changefileName } from '../../../axios/api'
import { createForm } from 'rc-form';
import { URL } from '../../../config'
const prompt = Modal.prompt;

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
    noFileName: {
        width: '2rem',
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

const Manager = (props) => {
    const [noHomeWorkList, setNoHomeWorkList] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [errorInfo, setErrorInfo] = useState('')
    const { getFieldProps } = props.form
    const Item = List.Item;
    const alert = Modal.alert;

    useEffect(() => {
        getNoHomeWorkList()
        getDetailList()
    }, [])

    const getAllFile = async (name) => {
        if (!name) return Toast.fail('请输入要打包的名称')
        const token = window.localStorage.getItem('token')
        window.location.assign(URL + '/file/downloadall/' + name + '/' + token)
    }

    const getOneFile = async (name) => {
        const token = window.localStorage.getItem('token')
        window.location.assign(URL + '/file/download/' + name + '/' + token)
    }

    const toDeleteData = (fileName) => {
        alert('删除', '确定删除这条数据', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            {
                text: 'Ok',
                onPress: async () => {
                    try {
                        const { status, msg } = await deteleOne({ name: fileName })
                        if (status == '200') {
                            Toast.success('删除文档成功')
                            getDetailList()
                            getNoHomeWorkList()
                        } else {
                            Toast.fail(msg)
                        }
                    } catch (e) {
                        console.log(e)
                        Toast.error('删除单个接口失败')
                    }

                },
            },
        ])
    }

    const toDeleteAll = () => {
        alert('删除', '确定删除这条数据', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            {
                text: 'Ok',
                onPress: async () => {
                    try {
                        const { status, msg } = await deleteAll()
                        if (status == '200') {
                            Toast.success('删除全部文档成功')
                            getDetailList()
                            getNoHomeWorkList()
                        } else {
                            Toast.fail(msg)
                        }
                    } catch (e) {
                        Toast.fail('删除全部接口失败')
                    }
                },
            },
        ])
    }
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
            try {
                setErrorInfo('')
                const { status, msg } = await changeFileFormat(value)
                if (status === '201') {
                    setErrorInfo(msg)
                } else {
                    await form.resetFields()
                    setErrorInfo('')
                    Toast.success(msg)
                }
            } catch (e) {
                console.log(e)
            }
        })
    }

    //获取未完成作业的列表
    const getNoHomeWorkList = async () => {
        try {
            let { data, status, msg } = await noHomeWorkListName()
            if (status == '200') {
                Toast.success('获取未完成作业列表成功')
                setNoHomeWorkList(data.data)
            } else {
                Toast.fail(msg)
            }
        } catch (e) {
            console.log(e)
            Toast.fail('获取未完成作业接口失败')
        }
    }
    //获取文件详情数据的接口
    const getDetailList = async () => {
        try {
            let { data, status, msg } = await detailList()
            if (status == '200') {
                Toast.success('获取列表成功')
                setDataSource(data.data)
            } else {
                Toast.fail(msg)
            }
        } catch (e) {

        }
    }

    const onCreate = async (value) => {
        if (!value.name) return Toast.fail('请输入名称')
        try {
            let { status, msg } = await changefileName(value)
            if (status === '200') {
                getDetailList()
            }
        } catch (e) {
            console.log(e)
        }
    }
    return <>
        <NavBar
            mode="light"
            style={styles.titleTop}
        >管理作业</NavBar>
        <WingBlank size="lg" style={{ marginTop: '2rem' }}>
            <WhiteSpace size="lg" />
            <Card>
                <Card.Header
                    title="作业未上交名单"
                />
                <Card.Body>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {
                            Array.isArray(noHomeWorkList) ? noHomeWorkList.map((item, index) => {
                                return <div key={index} style={styles.noFileName}>{item}</div>
                            }) : null
                        }
                    </div>
                </Card.Body>
            </Card>
            <WhiteSpace size="lg" />
        </WingBlank>
        <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card>
                <Card.Header
                    title="作业内容"
                />
                <Card.Body>
                    <List>
                        <InputItem
                            {...getFieldProps('content', {
                                rules: [{
                                    required: true,
                                    message: '请输入作业内容！',
                                }]
                            })}
                            placeholder="上传作业内容"
                        >作业内容</InputItem>
                        <InputItem
                            {...getFieldProps('format', {
                                rules:
                                    [
                                        {
                                            required: true,
                                            message: '请输入请输入命名格式！',
                                        },
                                    ]
                            })}
                            placeholder="请输入你的命名格式"
                        >命名格式</InputItem>
                        <InputItem
                            {...getFieldProps('detail', {})}
                            placeholder="请输入你的具体描述"
                        >详细说明</InputItem>
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

        <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card>
                <Card.Header
                    title="作业列表"
                    extra={<div>
                        <Button inline type="primary" size='small' style={{ marginRight: '.25rem' }} onClick={() => prompt(
                            '打包名称',
                            '输入名称包括后缀名，后缀一般为.zip',
                            [
                                { text: '取消' },
                                { text: '提交', onPress: (name) => { getAllFile(name) } }
                            ],
                            'text',
                        )}>全部导出</Button>
                        <Button inline type="primary" size='small' style={{ marginRight: '.25rem' }} onClick={toDeleteAll}>清空数据</Button>
                    </div>}
                />
                <Card.Body>
                    <List className="my-list">
                        {dataSource.map(item => {
                            return <Item extra={<div style={{ fontSize: '.4rem' }} key={item.sid}>
                                <a style={{ marginRight: '.5rem', color: "rgb(51, 163, 244)" }} onClick={() => toDeleteData(item.fileName)}>删除</a>
                                <a style={{ marginRight: '.5rem', color: 'rgb(51, 163, 244)' }} onClick={() => prompt(
                                    '重命名',
                                    '输入名称包括后缀名',
                                    [
                                        { text: '取消' },
                                        { text: '提交', onPress: (name) => { onCreate({ name, sid: item.sid }) } },
                                    ],
                                    'text',
                                )}>编辑</a>
                                <a style={{ marginRight: '.5rem', color: 'rgb(51, 163, 244)' }} onClick={() => getOneFile(item.fileName)}>导出</a>
                            </div>}>
                                <div style={{ fontSize: '.4rem' }}>
                                    <div>{`姓名:${item.name}`}</div>
                                    <div>{`学号:${item.sid}`}</div>
                                    <div>{`文件名:${item.fileName}`}</div>
                                </div>
                            </Item>
                        })}
                    </List>
                </Card.Body>
            </Card>
            <WhiteSpace size="lg" />
        </WingBlank>
    </>
}

export default createForm()(Manager)