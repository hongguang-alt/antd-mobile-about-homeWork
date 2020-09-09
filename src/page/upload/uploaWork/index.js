import React, { useState, useEffect } from 'react'
import { Card, WingBlank, WhiteSpace, Toast, Button, Icon, NavBar } from 'antd-mobile';
import { getFileName, upload } from '../../../axios/api'
import Upload from 'rc-upload'


const styles = {
    titleTop: {
        position: 'fixed',
        top: 0,
        zIndex: 99,
        width: '100%'
    }
}
const UploadWork = () => {

    const [fileName, setFileName] = useState({})
    const [fileList, setFileList] = useState([])
    const [uploading, setUploading] = useState(false)

    //初始化数据
    useEffect(() => {
        toGetFileName()
    }, [])

    //获取文件名以及格式
    const toGetFileName = async () => {
        try {
            let { status, data, msg } = await getFileName()
            if (status == '200') {
                setFileName(data)
            } else {
                Toast.fail(msg)
            }
        } catch (e) {
            Toast.fail('请求文件名称接口失败')
        }
    }

    //上传文件的接口
    const toUpload = async (formdata) => {
        try {
            let { status, msg } = await upload(formdata)
            if (status === '200') {
                setFileList([])
                setUploading(false)
                Toast.success('上传成功')
            } else {
                Toast.fail(msg)
                setUploading(false)
            }
        } catch (e) {
            Toast.fail('请求上传接口失败')
            setUploading(false)
        }
    }

    const onRemove = file => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1)
        setFileList(newFileList)
    }
    const props = {
        beforeUpload: file => {
            setFileList([file])
            console.log(file)
            return false;
        },
        fileList,
    };

    const handleUpload = () => {
        setUploading(true)
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        })
        toUpload(formData)
    }


    return <>
        <NavBar
            mode="light"
            style={styles.titleTop}
        >上传页面</NavBar>
        <WingBlank size="lg" style={{ marginTop: '2rem' }}>
            <WhiteSpace size="lg" />
            <Card>
                <Card.Header
                    title="上传要求"
                />
                <Card.Body>
                    <div style={{ textAlign: 'center' }}>
                        <div>
                            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>本次上传的作业：</span>
                            <span style={{ color: 'red' }}>{fileName.content}</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>命名方式：</span>
                            <span style={{ color: 'red' }}>{fileName.format}</span>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <WhiteSpace size="lg" />
        </WingBlank>
        <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card>
                <Card.Header
                    title="上传内容"
                />
                <Card.Body>
                    <Upload  {...props}>
                        <Button>
                            上传
                        </Button>
                    </Upload>
                    {
                        fileList[0] ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ margin: '.5rem', color: "rgb(51, 163, 244)", flex: 1 }}>
                                {fileList[0].name}
                            </div>
                            <div style={{ width: '2rem' }}>
                                <Icon type='cross-circle-o' size='xxs' onClick={() => onRemove(fileList[0])} />
                            </div>
                        </div> : null
                    }
                    <Button
                        type="primary"
                        onClick={handleUpload}
                        disabled={fileList.length === 0}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                    >
                        {uploading ? '上传中' : '开始上传'}
                    </Button>
                </Card.Body>
            </Card>
            <WhiteSpace size="lg" />
        </WingBlank>
    </>
}

export default UploadWork