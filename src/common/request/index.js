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
// eslint-disable-next-line no-unused-vars
const axiosRequest = async (method, suffix, props) => {
    const url = `${baseUrl}/${suffix}`;
    return errorFilter(await axios({
        method: method,
        url: url,
        data: {
            account: localStorage.getItem('account'),
            ...props,
        }
    }));
}

// 登录
export const login = async (props) => {
    console.log('request', '/login', props);
    // const response = await axiosRequest('post', '/login', {
    //     account: props.id,
    //     password: props.password
    // });
    const response = {
        "code": 200,
        "data": {
            username: '测试名'
        },
        "msg": "login success"
    }
    return (response);
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
    return (response);
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
    return (response);
}

// 批量删除账号
export const deleteAccount = async (props) => {
    console.log('request', '/account', props);
    // const response = await axiosRequest('delete', '/account', props);
    const response = {
        "code": 200,
        "msg": "success"
    }
    return (response);
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
    return (response);
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
    return (response);
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
    return (response);
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
    return (response);
}

// 编辑学生信息
export const updateStudent = async (props) => {
    console.log('request', '/student', props);
    // const response = await axiosRequest('post', '/student', props);
    const response = {
        "code": 200,
        "msg": "success"
    }
    return (response);
}

// 根据账号获取管理年级列表
export const getGradeMajor = async (props) => {
    console.log('request', '/counselor/grade', props);
    // const response = await axiosRequest('get', '/counselor/grade', props);
    const response = {
        "code": 200,
        "data": [
            {
                id: 122333,
                grade: 2018,
                majorName: '软件工程'
            },
            {
                id: 122334,
                grade: 2018,
                majorName: '计算机'
            },
            {
                id: 122335,
                grade: 2017,
                majorName: '计算机'
            }
        ],
        "msg": "success"
    }
    return (response);
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
    return (response);
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
    return (response);
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
    return (response);
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
    return (response);
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
    return (response);
}

// 编辑优秀率规则
export const updateQuota = async (props) => {
    console.log('request', '/quota', props);
    // const response = await axiosRequest('post', '/quota', props);
    const response = {
        "code": 200,
        "msg": "success"
    }
    return (response);
}

// 年级成绩分布饼状图
export const getGradeScorePieChart = async (props) => {
    console.log('request', '/score/grade/pieChart', props);
    // const response = await axiosRequest('get', '/score/grade/pieChart', props);
    const response = {
        "code": 200,
        "data": [2, 32, 52],
        "msg": "success"
    }
    return (response);
}

// 获取年级成绩列表
export const getScoreGradeClass = async (props) => {
    console.log('request', '/score/counselor', props);
    // const response = await axiosRequest('get', '/score/counselor', props);
    const response = {
        "code": 200,
        "data": [
            {
                "average": 0,
                "classNum": 0,
                "failNum": 0,
                "gradePointAB": 0,
                "pass": 0,
                "subjectAB": 0,
                "totalNum": 0
            },
            {
                "average": 1,
                "classNum": 1,
                "failNum": 1,
                "gradePointAB": 1,
                "pass": 1,
                "subjectAB": 1,
                "totalNum": 1
            }
          ],
        "msg": "success"
    }
    return (response);
}

// 辅导员可对比班级成绩列表
export const getGradeSubjectList = async (props) => {
    console.log('request', '/course/counselorList', props);
    // const response = await axiosRequest('get', '/course/counselorList', props);
    const response = {
        "code": 200,
        "data": [
            {
                "courseId": 0,
                "courseName": "课程1"
            },
            {
                "courseId": 1,
                "courseName": "课程2"
            },
            {
                "courseId": 2,
                "courseName": "课程3"
            }
        ],
        "msg": "success"
    }
    return (response);
}

// 年级成绩优势雷达图
export const getGradeScoreRadarChart = async (props) => {
    console.log('request', '/score/grade/average', props);
    // const response = await axiosRequest('get', '/score/grade/average', props);
    const response = {
        "code": 200,
        "data": [
            {
                "average": 60,
                "courseId": 0,
                "courseName": "课程1"
            },
            {
                "average": 70,
                "courseId": 1,
                "courseName": "课程2"
            },
            {
                "average": 90,
                "courseId": 2,
                "courseName": "课程3"
            }
        ],
        "msg": "success"
    }
    return (response);
}