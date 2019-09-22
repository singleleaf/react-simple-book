import * as actionTypes from './constants'
import {fromJS} from 'immutable'
import axios from 'axios'
export const searchFocus = () => ({
    type:actionTypes.SEARCH_FOCUS
});
export const searchBlur = () => ({
    type:actionTypes.SEARCH_BLUR
});
export const mouseEnter = () => ({
    type:actionTypes.MOUSE_ENTER
});
export const mouseLeave = () => ({
    type:actionTypes.MOUSE_LEAVE
});
export const changePage = (page) => ({
    type:actionTypes.CHANGE_PAGE,
    page
});


const changeList = (data) => ({
    type:actionTypes.CHANGE_LIST,
    data:fromJS(data), //将数据变成immutable类型的数据
    totalPage:Math.ceil(data.length / 10)
});
export const getList = () =>  {
    return (dispatch) => {
        console.log(123)
        axios.get('/api/headerList.json').then((res) => {
            const data =res.data.data;
            const action = changeList(data);
            dispatch(action)
        }).catch((err) => {
            console.log(err);
        })

    }
}
