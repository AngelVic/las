import axios from 'axios';
import { ElMessage } from 'element-plus';

const baseUrl = 'http://.../api';

// 错误处理
const errorFilter = (data) => {
    if(data.code !== 200) {
        ElMessage({
            message: `错误${data.code}[${data.msg}]`,
            type: 'error',
        })
        return null;
    }
    return data;
}

// axios请求
const axiosRequest = async (method, suffix, props) => {
    const url = `${baseUrl}/${suffix}`;
    return await axios({
        method: method,
        url: url,
        data: {
            ...props
        }
    });
}

// 创建辅导员账号
export const createAccount = async (props) => {
    console.log('request', '/account', props);
    // const response = await axiosRequest('post', '/account', props);
    const response = {
        "code": 200,
        "data": 0,
        "msg": "success"
    }
    return errorFilter(response);
}

// 修改辅导员账号
export const updateAccount = async (props) => {
    console.log('request', '/account', props);
    // const response = await axiosRequest('post', '/account', props);
    const response = {
        "code": 200,
        "data": 0,
        "msg": "success"
    }
    return errorFilter(response);
}

// 批量删除账号
export const deleteAccount = async (props) => {
    console.log('request', '/account', props);
    // const response = await axiosRequest('delete', '/account', props);
    const response = {
        "code": 200,
        "msg": "success"
    }
    return errorFilter(response);
}