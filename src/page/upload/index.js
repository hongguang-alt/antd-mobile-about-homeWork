import React, { useState } from 'react'
import { TabBar, Icon } from 'antd-mobile';


const styles = {
    fulls: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0
    }
}

const Upload = () => {
    const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) => (
        <svg
            className={`am-icon am-icon-${type.substr(1)} am-icon-${size} ${className}`}
            {...restProps}
        >
            <use xlinkHref={type} /> {/* svg-sprite-loader@0.3.x */}
            {/* <use xlinkHref={#${type.default.id}} /> */} {/* svg-sprite-loader@latest */}
        </svg>
    );

    const [chooseTab, setChooseTab] = useState('uploadwork')

    const renderContent = (text) => {
        return text
    }

    return <div style={styles.fulls}>
        <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
        >
            <TabBar.Item
                title="上传"
                key="uploadwork"
                icon={<CustomIcon type={require('../../static/img/uploadwork1.svg')} />}
                selectedIcon={
                    <CustomIcon type={require('../../static/img/uploadwork.svg')} />
                }
                selected={chooseTab === 'uploadwork'}
                onPress={() => {
                    setChooseTab('uploadwork')
                }}
                data-seed="logId"
            >
                {renderContent('uploadwork')}
            </TabBar.Item>
            <TabBar.Item
                icon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                }
                selectedIcon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                }
                title="修改密码"
                key="changep"
                selected={chooseTab === 'changep'}
                onPress={() => {
                    setChooseTab('changep')
                }}
                data-seed="logId1"
            >
                {renderContent('changep')}
            </TabBar.Item>
            <TabBar.Item
                icon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                }
                selectedIcon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                }
                title="管理作业"
                key="manager"
                selected={chooseTab === 'manager'}
                onPress={() => {
                    setChooseTab('manager')
                }}
                data-seed="logId2"
            >
                {renderContent('manager')}
            </TabBar.Item>
            <TabBar.Item
                icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                title="我的"
                key="my"
                selected={chooseTab === 'my'}
                onPress={() => {
                    setChooseTab('my')
                }}
                data-seed="logId3"
            >
                {renderContent('My')}
            </TabBar.Item>
        </TabBar>
    </div >
}

export default Upload