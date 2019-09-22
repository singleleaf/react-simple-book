
import {fromJS} from 'immutable';
import * as constants from './constants'
const defaultState =fromJS({
    topicList: [],
    recommendList: [],
    articleList: [],
    articlePage:1,
    showScroll:false

}) ;
const addArticleList  = (state,action) => {
    return state.merge({
        'articleList':state.get('articleList').concat(action.list),
        'articlePage': action.nextPage
    })

}

export default (state = defaultState,action) => {
        switch(action.type) {
            case constants.CHANGE_HOME_DATA:
               return state.merge({
                    topicList: fromJS(action.topicList),
                    recommendList: fromJS(action.recommendList),
                    articleList: fromJS(action.articleList)
                })
               case constants.ADD_ARTICLE_LIST:
                return addArticleList(state,action);
                case constants.TOGGLE_SCROLL_TOP:
            return state.set('showScroll', action.show);



        }
        return state;

}
