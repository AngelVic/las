import axios from 'axios';
import { ElMessage } from 'element-plus';

const baseUrl = '/api';

// 错误处理
const errorFilter = (data) => {
    console.log('res data', data);
    if(data.status !== 200) {
        ElMessage({
            message: `错误${data.status}[${data.statusText}]`,
            type: 'error',
        })
        return null;
    }
    return data.data;
}

// axios请求
// eslint-disable-next-line no-unused-vars
const axiosRequest = async (method, suffix, props) => {
    const url = `${baseUrl}${suffix}`;
    let defaultParams = {};
    if(suffix!=='/account') {
        defaultParams = {
            account: localStorage.getItem('account'),
        }
    }
    const data = {
        ...defaultParams,
        ...props,
    }
    if(method === 'get' || method === 'POST' || method === 'put') {
        return errorFilter(await axios({
            method: method,
            url: url,
            params: data
        }));
    }
    if(suffix==='/account/delete') {
        // 账户删除需要form-data 特殊处理
        const formData = new FormData();
        for(let key in data) {
            formData.append(key, data[key]);
        }
        return errorFilter(await axios({
            method: method,
            url: url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }));
    }
    return errorFilter(await axios({
        method: method,
        url: url,
        data: data
    }));
}

// 登录 done
export const login = async (props) => {
    console.log('request', '/login', props);
    const response = await axiosRequest('POST', '/login', {
        account: props.id,
        password: props.password
    });
    // const response = {
    //     "code": 200,
    //     "data": {
    //         username: '测试名'
    //     },
    //     "msg": "login success"
    // }
    return (response); 
}

// 获取辅导员名 done
export const getUserName = async (props) => {
    console.log('request', '/counselor/name', props);
    const response = await axiosRequest('get', '/counselor/name', {
        account: props.id,
    });
    // const response = {
    //     "code": 200,
    //     "data": '测试名1',
    //     "msg": "success"
    // }
    return (response);
}

// 预警消息列表 done
export const getWarningList = async (props) => {
    console.log('request', '/warning', props);
    const readedResponse = await axiosRequest('get', '/warning', {
        ...props,
        isRead: true
    });
    const unreadResponse = await axiosRequest('get', '/warning', {
        ...props,
        isRead: false
    });
    const response = {
        "code": readedResponse.code===200&&unreadResponse.code===200?200:300,
        "data": {
            readedList: readedResponse.data,
            unreadList: unreadResponse.data
        },
        'msg': ''
    }
    // const response = {
    //     "code": 200,
    //     "data": {
    //         readedList: [
    //             {
    //                 "creatTime": "2022-05-05T08:13:54.198Z",
    //                 "isRead": false,
    //                 "recordId": 0,
    //                 "term": 1,
    //                 "warningList": [
    //                     {
    //                         "building": 31,
    //                         "failNum": 3,
    //                         "room": 111,
    //                         "studentId": 11122211,
    //                         "studentName": "学生1"
    //                     }
    //                 ]
    //             }
    //         ],
    //         unreadList: [
    //         ],
    //     },
    //     'msg': ''
    // }
    return (response);
}

// 预警消息全部已读 padding-需要测试数据
export const setAllWarningReaded = async (props) => {
    console.log('request', '/warning/total', props);
    const response = await axiosRequest('get', '/warning/total', props);
    // const response = {
    //     "code": 200,
    //     "msg": "success"
    // }
    return (response);
}

// 预警消息已读 done
export const setWarningReaded = async (props) => {
    console.log('request', '/warning/read', props);
    const response = await axiosRequest('get', '/warning/read', {
        recordId: props.id
    });
    // const response = {
    //     "code": 200,
    //     "msg": "success"
    // }
    return (response);
}

// 辅导员账号获取管理年级列表 done
export const getGradeMajor = async (props) => {
    console.log('request', '/grade', props);
    const response = await axiosRequest('get', '/grade', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //             id: 122333,
    //             grade: 2018,
    //             majorName: '软件工程'
    //         },
    //         {
    //             id: 122334,
    //             grade: 2018,
    //             majorName: '计算机'
    //         },
    //         {
    //             id: 122335,
    //             grade: 2017,
    //             majorName: '计算机'
    //         }
    //     ],
    //     "msg": "success"
    // }
    return (response);
}

// 辅导员获取年级基本信息 padding-参数不对
export const getGradeBasic = async (props) => {
    console.log('request', '/score/base', props);
    const response = await axiosRequest('get', '/score/base', props);
    // const response = {
    //     "code": 200,
    //     "data": {
    //         totalNum: 200,
    //         failNum: 3,
    //         excellentRate: '15%',
    //         pass: '98%',
    //         failSizeCompare: '10%',
    //         excellentRateComapre: '5%',
    //         passRateCompare: '-5%'
    //     },
    //     "msg": "success"
    // }
    return (response);
}

// 年级成绩分布饼状图 done
export const getGradeScorePieChart = async (props) => {
    console.log('request', '/score/grade/pieChart', props);
    const response = await axiosRequest('get', '/score/grade/pieChart', props);
    // const response = {
    //     "code": 200,
    //     "data": [2, 32, 52],
    //     "msg": "success"
    // }
    return (response);
}

// 辅导员可对比课程列表 done
export const getGradeSubjectList = async (props) => {
    console.log('request', '/course/counselorList', props);
    const response = await axiosRequest('get', '/course/counselorList', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //             "courseId": 0,
    //             "courseName": "课程1"
    //         },
    //         {
    //             "courseId": 1,
    //             "courseName": "课程2"
    //         },
    //         {
    //             "courseId": 2,
    //             "courseName": "课程3"
    //         }
    //     ],
    //     "msg": "success"
    // }
    return (response);
}

// 辅导员获取年级成绩列表 done
export const getScoreGradeClass = async (props) => {
    console.log('request', '/score/counselor', props);
    const response = await axiosRequest('get', '/score/counselor', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //             "average": 0,
    //             "classNum": 0,
    //             "failNum": 0,
    //             "gradePointAB": 0,
    //             "pass": 0,
    //             "subjectAB": 0,
    //             "totalNum": 0
    //         },
    //         {
    //             "average": 1,
    //             "classNum": 1,
    //             "failNum": 1,
    //             "gradePointAB": 1,
    //             "pass": 1,
    //             "subjectAB": 1,
    //             "totalNum": 1
    //         }
    //       ],
    //     "msg": "success"
    // }
    return (response);
}

// 年级成绩优势雷达图 done
export const getGradeScoreRadarChart = async (props) => {
    console.log('request', '/score/grade/average', props);
    const response = await axiosRequest('get', '/score/grade/average', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //             "average": 60,
    //             "courseId": 0,
    //             "courseName": "课程1"
    //         },
    //         {
    //             "average": 70,
    //             "courseId": 1,
    //             "courseName": "课程2"
    //         },
    //         {
    //             "average": 90,
    //             "courseId": 2,
    //             "courseName": "课程3"
    //         }
    //     ],
    //     "msg": "success"
    // }
    return (response);
}

// 获取优秀率及格率指标 done
export const getIndicator = async (props) => {
    console.log('request', '/quota', props);
    const response = await axiosRequest('get', '/quota', props);
    // const response = {
    //     "code": 200,
    //     "data": {
    //         "classAB": 1,
    //         "cutOff": 2,
    //         "gradeAB": 3,
    //         "specialCutoff": 4,
    //         "subjectAB": 5
    //     },
    //     "msg": "success"
    // }
    return (response);
}

// 设置优秀率及格率指标 done
export const setIndicator = async (props) => {
    console.log('request', '/quota', props);
    const response = await axiosRequest('post', '/quota', props);
    // const response = {
    //     "code": 200,
    //     "msg": "success"
    // }
    return (response);
}

// 根据账号获取管理班级列表 done
export const getGradeMajorClass = async (props) => {
    console.log('request', '/class/counselor', props);
    const response = await axiosRequest('get', '/class/counselor', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //             id: 122333,
    //             grade: 2018,
    //             majorName: '软件工程',
    //             "classId": 0,
    //             "name": 1
    //         },
    //         {
    //             id: 122333,
    //             grade: 2018,
    //             majorName: '软件工程',
    //             "classId": 3,
    //             "name": 2
    //         },
    //         {
    //             id: 122334,
    //             grade: 2018,
    //             majorName: '计算机',
    //             "classId": 1,
    //             "name": 1
    //         },
    //         {
    //             id: 122335,
    //             grade: 2017,
    //             majorName: '计算机',
    //             "classId": 2,
    //             "name": 1
    //         }
    //     ],
    //     "msg": "success"
    // }
    return (response);
}

// 班级课程列表 done
export const getClassSubjectList = async (props) => {
    console.log('request', '/course/classScore', props);
    const response = await axiosRequest('get', '/course/classScore', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //             "courseId": 0,
    //             "courseName": "课程1"
    //         },
    //         {
    //             "courseId": 1,
    //             "courseName": "课程2"
    //         },
    //         {
    //             "courseId": 2,
    //             "courseName": "课程3"
    //         }
    //     ],
    //     "msg": "success"
    // }
    return (response);
}

// 班级成绩优势雷达图 done
export const getClassRadarChart = async (props) => {
    console.log('request', '/score/class/average', props);
    const response = await axiosRequest('get', '/score/class/average', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //             "average": 60,
    //             "courseId": 0,
    //             "courseName": "课程1"
    //         },
    //         {
    //             "average": 70,
    //             "courseId": 1,
    //             "courseName": "课程2"
    //         },
    //         {
    //             "average": 90,
    //             "courseId": 2,
    //             "courseName": "课程3"
    //         }
    //     ],
    //     "msg": "success"
    // }
    return (response);
}

// 班级成绩分布饼状图 done
export const getClassScorePieChart = async (props) => {
    console.log('request', '/score/class/pieChart', props);
    const response = await axiosRequest('get', '/score/class/pieChart', props);
    // const response = {
    //     "code": 200,
    //     "data": [2, 32, 52],
    //     "msg": "success"
    // }
    return (response);
}

// 年级-班级优秀及格率 done
export const getClassGradeRate = async (props) => {
    console.log('request', '/score/class/comparison', props);
    const response = await axiosRequest('get', '/score/class/comparison', props);
    // const response = {
    //     "code": 200,
    //     "data": {
    //         "classAB": 1,
    //         "classPass": 2,
    //         "gradeAB": 3,
    //         "gradePass": 4
    //     },
    //     "msg": "success"
    // }
    return (response);
}

// 班级成绩列表 done
export const getClassScoretList = async (props) => {
    console.log('request', '/score/class', props);
    const response = await axiosRequest('get', '/score/class', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //             "gradePoint": 1.5,
    //             "name": "姓名1",
    //             "scoreList": [
    //                 {
    //                     courseId: 0,
    //                     score: 66,
    //                     makeUp: 0
    //                 },
    //                 {
    //                     courseId: 1,
    //                     score: 51,
    //                     makeUp: 65
    //                 },
    //                 {
    //                     courseId: 2,
    //                     score: 71,
    //                     makeUp: 0
    //                 }
    //             ],
    //             "studentId": 111111111
    //         },
    //         {
    //             "gradePoint": 1.7,
    //             "name": "姓名2",
    //             "scoreList": [
    //                 {
    //                     courseId: 0,
    //                     score: 66,
    //                     makeUp: 0
    //                 },
    //                 {
    //                     courseId: 1,
    //                     score: 88,
    //                     makeUp: 0
    //                 },
    //                 {
    //                     courseId: 2,
    //                     score: 71,
    //                     makeUp: 0
    //                 }
    //             ],
    //             "studentId": 111111112
    //         }
    //     ],
    //     "msg": "success"
    // }
    return (response);
}

// 学生搜索建议列表 done
export const getStudentSuggestion = async (props) => {
    console.log('request', '/student/search', props);
    const response = await axiosRequest('get', '/student/search', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //             "studentId": 333,
    //             "name": "学生1",
    //         },
    //         {
    //             "studentId": 111111112,
    //             "name": "学生2",
    //         }
    //     ],
    //     "msg": "success"
    // }
    return (response);
}

// 获取学生信息及成绩
export const getStudentScore = async (props) => {
    console.log('request', '/student/score', props);
    const response = await axiosRequest('get', '/student/score', props);
    // const response = {
    //     "code": 200,
    //     "data": {
    //         "building": 111,
    //         "isSpecial": false,
    //         "name": "string",
    //         "room": 222,
    //         "studentId": 333,
    //         "classRank": 11,
    //         "gradeRank": 12,
    //         gradeList: [
    //             {
    //                 term: 201802,
    //                 gradePoint: 1.5
    //             },
    //             {
    //                 term: 201901,
    //                 gradePoint: 2.1
    //             }
    //         ]
    //     },
    //     "msg": "success"
    // }
    return (response);
}

// 查找专业年级下属班级 done
export const searchClass = async (props) => {
    console.log('request', '/class', props);
    const response = await axiosRequest('get', '/class', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //             "classId": 0,
    //             "name": 1
    //         },
    //         {
    //             "classId": 1,
    //             "name": 2
    //         },
    //         {
    //             "classId": 2,
    //             "name": 3
    //         }
    //     ],
    //     "msg": "success"
    // }
    return (response);
}

// 获取文件列表 done
export const getFileList = async (props) => {
    console.log('request', '/file', props);
    const response = await axiosRequest('get', '/file', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //             fileId: 0,
    //             grade: 2018,
    //             majorName: '计算机',
    //             term: 201801,
    //             admin: '负责人1',
    //             fileUrl: 'url',
    //             fileName: '文件名1',
    //             uploadTime: '2022-03-28T11:04:23.340Z',
    //             state: 0
    //         },
    //         {
    //             fileId: 1,
    //             grade: 2018,
    //             majorName: '计算机',
    //             term: 201801,
    //             admin: '负责人2',
    //             fileUrl: 'url',
    //             fileName: '文件名2',
    //             uploadTime: '2022-03-28T11:04:23.340Z',
    //             state: 1
    //         },
    //         {
    //             fileId: 2,
    //             grade: 2018,
    //             majorName: '计算机',
    //             term: 201801,
    //             admin: '负责人3',
    //             fileUrl: 'url',
    //             fileName: '文件名3',
    //             uploadTime: '2022-03-28T11:04:23.340Z',
    //             state: 2
    //         }
    //     ],
    //     "msg": "success"
    // }
    return (response);
}

// 上传excel文件 padding
export const uploadFile = async (props) => {
    console.log('request', '/file/excel', props);
    const response = await axiosRequest('post', '/file/excel', props);
    // const response = {
    //     "code": 200,
    //     "data": "string",
    //     "msg": "success"
    // }
    return (response);
}

// 删除文件 padding
export const deleteFileMulti = async (props) => {
    console.log('request', '/file', props);
    const response = await axiosRequest('delete', '/file', props);
    // const response = {
    //     "code": 200,
    //     "msg": "success"
    // }
    return (response);
}

// 获取学生信息列表 done
export const getStudentInfoList = async (props) => {
    console.log('request', '/student', props);
    const response = await axiosRequest('get', '/student', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //           "building": 111,
    //           "isSpecial": false,
    //           "name": "string",
    //           "room": 222,
    //           "studentId": 333
    //         },
    //         {
    //             "building": 222,
    //             "isSpecial": false,
    //             "name": "string",
    //             "room": 555,
    //             "studentId": 444
    //           }
    //       ],
    //     "msg": "success"
    // }
    return (response);
}

// 编辑学生信息 done
export const updateStudent = async (props) => {
    console.log('request', '/student', props);
    const response = await axiosRequest('post', '/student', props);
    // const response = {
    //     "code": 200,
    //     "msg": "success"
    // }
    return (response);
}

// 修改辅导员密码 done
export const alterAccount = async (props) => {
    console.log('request', '/account/alter', props);
    const response = await axiosRequest('put', '/account/alter', props);
    // const response = {
    //     "code": 200,
    //     "data": 0,
    //     "msg": "success"
    // }
    return (response);
}

// 修改管理员密码 done
export const alterAdminAccount = async (props) => {
    console.log('request', '/admin/alter', props);
    const response = await axiosRequest('put', '/admin/alter', props);
    // const response = {
    //     "code": 200,
    //     "data": 0,
    //     "msg": "success"
    // }
    return (response);
}

// 管理员账号获取管理专业年级 done
export const getAdminGradeMajor = async (props) => {
    console.log('request', '/grade/admin', props);
    const response = await axiosRequest('get', '/grade/admin', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //             id: 122333,
    //             grade: 2018,
    //             majorName: '软件工程'
    //         },
    //         {
    //             id: 122334,
    //             grade: 2018,
    //             majorName: '计算机'
    //         },
    //         {
    //             id: 122335,
    //             grade: 2017,
    //             majorName: '计算机'
    //         }
    //     ],
    //     "msg": "success"
    // }
    return (response);
}

// 查询负责人列表 done
export const searchCounselor = async (props) => {
    console.log('request', '/counselor/list', props);
    const response = await axiosRequest('get', '/counselor/list', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //           "account": 0,
    //           "createTime": "2022-03-28T11:04:23.340Z",
    //           "gradeId": 0,
    //           "id": 0,
    //           "name": "string"
    //         }
    //       ],
    //     "msg": "success"
    // }
    return (response);
}

// 获取辅导员信息 done
export const getAccountDetail = async (props) => {
    console.log('request', '/grade/counselor', props);
    const response = await axiosRequest('get', '/grade/counselor', {
        'counselor-account': props.account
    });
    // const response = {
    //     "code": 200,
    //     "data": {
    //         "account": 111,
    //         "gradeList": [
    //             {
    //                 "grade": 2018,
    //                 "id": 122333,
    //                 "majorName": "软件工程"
    //             },
    //             {
    //                 "grade": 2017,
    //                 "id": 122335,
    //                 "majorName": "计算机"
    //             }
    //         ],
    //         "name": "辅导员名"
    //     },
    //     "msg": "success"
    // }
    return (response);
}

// 创建辅导员账号 done
export const createAccount = async (props) => {
    console.log('request', '/account', props);
    const response = await axiosRequest('post', '/account', props);
    // const response = {
    //     "code": 200,
    //     "data": 111,
    //     "msg": "success"
    // }
    return (response);
}

// 修改辅导员账号 done
export const updateAccount = async (props) => {
    console.log('request', '/account', props);
    const response = await axiosRequest('post', '/account', props);
    // const response = {
    //     "code": 200,
    //     "data": 11,
    //     "msg": "success"
    // }
    return (response);
}

// 删除账号 done
export const deleteAccount = async (props) => {
    console.log('request', '/account/delete', props);
    const response = await axiosRequest('post', '/account/delete', props);
    // const response = {
    //     "code": 200,
    //     "msg": "success"
    // }
    return (response);
}

// 重置辅导员账号密码 done
export const resetAccount = async (props) => {
    console.log('request', `/account/${props.account}/pwd`, {});
    const response = await axiosRequest('put', `/account/${props.account}/pwd`, props);
    // const response = {
    //     "code": 200,
    //     "msg": "success"
    // }
    return (response);
}

// 学院管理的专业列表 done
export const getAdminMajor = async (props) => {
    console.log('request', '/major', props);
    const response = await axiosRequest('get', '/major', {
        ...props,
        'admin-account': localStorage.getItem('account')
    });
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //             "majorId": 0,
    //             "majorName": "软件工程"
    //         },
    //         {
    //             "majorId": 1,
    //             "majorName": "计算机"
    //         }
    //     ],
    //     "msg": "success"
    // }
    return (response);
}

// 获取专业下属课程 done
export const getMajorCourse = async (props) => {
    console.log('request', '/course/adminList', props);
    const response = await axiosRequest('get', '/course/adminList', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //             "courseId": 1,
    //             "courseName": "大学物理"
    //         },
    //         {
    //             "courseId": 2,
    //             "courseName": "高等数学"
    //         },
    //         {
    //             "courseId": 2,
    //             "courseName": "线性代数"
    //         }
    //       ],
    //     "msg": "success"
    // }
    return (response);
}

// 获取年级成绩列表 done
export const getGradeScore = async (props) => {
    console.log('request', '/score/admin', props);
    const response = await axiosRequest('get', '/score/admin', props);
    // const response = {
    //     "code": 200,
    //     "data": [
    //         {
    //           "average": 0,
    //           "failNum": 0,
    //           "grade": 2018,
    //           "gradeAB": 0,
    //           "pass": 0,
    //           "subjectAB": 0,
    //           "totalNum": 0
    //         },
    //         {
    //             "average": 1,
    //             "failNum": 1,
    //             "grade": 2019,
    //             "gradeAB": 1,
    //             "pass": 1,
    //             "subjectAB": 1,
    //             "totalNum": 1
    //           }
    //       ],
    //     "msg": "success"
    // }
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

// 获取优秀率规则
export const getQuota = async (props) => {
    console.log('request', '/quota', props);
    const response = await axiosRequest('get', '/quota', props);
    // const response = {
    //     "code": 200,
    //     "data": {
    //         "classAB": 0,
    //         "cutOff": 0,
    //         "gradeAB": 0,
    //         "specialCutoff": 0,
    //         "subjectAB": 0
    //     },
    //     "msg": "success"
    // }
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