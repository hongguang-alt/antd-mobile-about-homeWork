import React, { useState, useEffect } from 'react'
import { TabBar, Icon } from 'antd-mobile';
import UploadWork from './uploaWork'
import Changep from './changep'
import My from './my'
import Manager from './manager'
import jwt from 'jsonwebtoken'

const styles = {
    fulls: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0
    }
}

const Upload = () => {
    const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) => {
        return <svg
            className={`am-icon am-icon-${type.default.id.substr(1)} am-icon-${size} ${className}`}
            {...restProps}
        >
            {/* <use xlinkHref={type} /> */}
            {/* svg-sprite-loader@0.3.x */}
            <use xlinkHref={`#${type.default.id}`} />
            {/* svg-sprite-loader@latest */}
        </svg>
    }

    const [chooseTab, setChooseTab] = useState('uploadwork')
    const [role, setRole] = useState('student')


    useEffect(() => {
        let { role } = jwt.verify(window.localStorage.getItem('token'), 'yinxiu')
        setRole(role)
    })

    const renderContent = () => {
        switch (chooseTab) {
            case "uploadwork": return <UploadWork />
            case "changep": return <Changep />
            case 'manager': return <Manager />
            case 'my': return <My />
        }
    }

    return <>
        <div style={styles.fulls}>
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                <TabBar.Item
                    title="上传"
                    key="uploadwork"
                    icon={<CustomIcon type={require('../../static/img/uploadwork.svg')} />}
                    selectedIcon={
                        <CustomIcon type={require('../../static/img/uploadwork1.svg')} />
                    }
                    selected={chooseTab === 'uploadwork'}
                    onPress={() => {
                        setChooseTab('uploadwork')
                    }}
                    data-seed="logId"
                >
                    {chooseTab === 'uploadwork' ? renderContent() : ''}
                </TabBar.Item>
                <TabBar.Item
                    icon={<CustomIcon type={require('../../static/img/changep1.svg')} />}
                    selectedIcon={
                        <CustomIcon type={require('../../static/img/changep.svg')} />
                    }
                    title="修改密码"
                    key="changep"
                    selected={chooseTab === 'changep'}
                    onPress={() => {
                        setChooseTab('changep')
                    }}
                    data-seed="logId1"
                >
                    {chooseTab === 'changep' ? renderContent() : ''}
                </TabBar.Item>
                <TabBar.Item
                    icon={<CustomIcon type={require('../../static/img/my1.svg')} />}
                    selectedIcon={
                        <CustomIcon type={require('../../static/img/my.svg')} />
                    }
                    title="我的"
                    key="my"
                    selected={chooseTab === 'my'}
                    onPress={() => {
                        setChooseTab('my')
                    }}
                    data-seed="logId3"
                >
                    {chooseTab === 'my' ? renderContent() : ''}
                </TabBar.Item>
                {role === 'admin' ? <TabBar.Item
                    icon={<CustomIcon type={require('../../static/img/manger.svg')} />}
                    selectedIcon={
                        <CustomIcon type={require('../../static/img/manger1.svg')} />
                    }
                    title="管理作业"
                    key="manager"
                    selected={chooseTab === 'manager'}
                    onPress={() => {
                        setChooseTab('manager')
                    }}
                    data-seed="logId2"
                >
                    {chooseTab === 'manager' ? renderContent() : ''}
                </TabBar.Item> : ''}

            </TabBar>
        </div ></>
}

export default Upload