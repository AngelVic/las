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


// 修改辅导员密码
export const alterAccount = async (props) => {
    console.log('request', '/account/alter', props);
    // const response = await axiosRequest('put', '/account/alter', props);
    const response = {
        "code": 200,
        "data": 0,
        "msg": "success"
    }
    return errorFilter(response);
}

// 查询负责人列表
export const searchCounselor = async (props) => {
    console.log('request', '/counselor/list', props);
    // const response = await axiosRequest('get', '/counselor/list', props);
    const response = {
        "code": 200,
        "data": [
            {
              "account": 0,
              "createTime": "2022-03-28T11:04:23.340Z",
              "gradeId": 0,
              "id": 0,
              "name": "string"
            }
          ],
        "msg": "success"
    }
    return errorFilter(response);
}

// 查找专业年级下属班级
export const searchClass = async (props) => {
    console.log('request', '/class', props);
    // const response = await axiosRequest('get', '/class', props);
    const response = {
        "code": 200,
        "data": [
            {}
        ],
        "msg": "success"
    }
    return errorFilter(response);
}

// 查找学生信息列表
export const searchStudent = async (props) => {
    console.log('request', '/student', props);
    // const response = await axiosRequest('get', '/student', props);
    const response = {
        "code": 200,
        "data": [
            {
              "building": 0,
              "isSpecial": false,
              "name": "string",
              "room": 0,
              "studentId": 0
            }
          ],
        "msg": "success"
    }
    return errorFilter(response);
}

// 编辑学生信息
export const updateStudent = async (props) => {
    console.log('request', '/student', props);
    // const response = await axiosRequest('post', '/student', props);
    const response = {
        "code": 200,
        "msg": "success"
    }
    return errorFilter(response);
}

// 根据账号获取管理年级id列表
export const getGrade = async (props) => {
    console.log('request', '/counselor/grade', props);
    // const response = await axiosRequest('get', '/counselor/grade', props);
    const response = {
        "code": 200,
        "data": [
            0
        ],
        "msg": "success"
    }
    return errorFilter(response);
}

// 获取科目列表
export const getCourse = async (props) => {
    console.log('request', '/course', props);
    // const response = await axiosRequest('get', '/course', props);
    const response = {
        "code": 200,
        "data": [
            {
              "courseId": 0,
              "courseName": "string"
            }
          ],
        "msg": "success"
    }
    return errorFilter(response);
}

// 获取学院管理的专业列表
export const getMajor = async (props) => {
    console.log('request', '/major', props);
    // const response = await axiosRequest('get', '/major', props);
    const response = {
        "code": 200,
        "data": [
            {
              "majorId": 0,
              "majorName": "string"
            }
          ],
        "msg": "success"
    }
    return errorFilter(response);
}

// 获取年级成绩列表
export const getScore = async (props) => {
    console.log('request', '/score', props);
    // const response = await axiosRequest('get', '/score', props);
    const response = {
        "code": 200,
        "data": [
            {
              "average": 0,
              "failNum": 0,
              "grade": 0,
              "gradeAB": 0,
              "pass": 0,
              "subjectAB": 0,
              "totalNum": 0
            }
          ],
        "msg": "success"
    }
    return errorFilter(response);
}

// 上传excel文件
export const uploadFile = async (props) => {
    console.log('request', '/file/excel', props);
    // const response = await axiosRequest('post', '/file/excel', props);
    const response = {
        "code": 200,
        "data": "string",
        "msg": "success"
    }
    return errorFilter(response);
}

// 获取优秀率规则
export const getQuota = async (props) => {
    console.log('request', '/quota', props);
    // const response = await axiosRequest('get', '/quota', props);
    const response = {
        "code": 200,
        "data": {
            "classAB": 0,
            "cutOff": 0,
            "gradeAB": 0,
            "specialCutoff": 0,
            "subjectAB": 0
        },
        "msg": "success"
    }
    return errorFilter(response);
}

// 编辑优秀率规则
export const updateQuota = async (props) => {
    console.log('request', '/quota', props);
    // const response = await axiosRequest('post', '/quota', props);
    const response = {
        "code": 200,
        "msg": "success"
    }
    return errorFilter(response);
}

