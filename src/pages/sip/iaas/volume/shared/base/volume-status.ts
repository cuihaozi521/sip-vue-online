import { SipCreateStatus } from '../../../../shared/base/sip-status';

export const VolumeStatus = SipCreateStatus({
    //活动中(后台无些状态)
    "active": {
        value: 'active',
        text: "活动中",
        className: ""
    },
    //创建中
    "creating": {
        value: 'creating',
        text: "创建中",
        className: "warning"
    },
    //空闲
    "available": {
        value: 'available',
        text: "空闲",
        className: "success"
    },
    //使用中
    "in-use": {
        value: 'in-use',
        text: "使用中",
        className: "success"
    },
    //删除中
    "deleting": {
        value: 'deleting',
        text: "删除中",
        className: "warning"
    },
    //已删除
    "deleted": {
        value: 'deleted',
        text: "已删除",
        className: "default"
    },
    //挂接中
    "attaching": {
        value: 'attaching',
        text: "挂接中",
        className: "warning"
    },
    //卸载中
    "detaching": {
        value: 'attaching',
        text: "卸载中",
        className: "warning"
    }
});