import React,{PureComponent} from 'react';
import {connect} from 'react-redux'
import List from './components/List'
import Topic from './components/Topic'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import { actionCreators } from './store';
import {
    HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop
} from './style';
class Home extends PureComponent {
    handleScrollTop() {
        window.scrollTo(0, 0);
    }
    render() {
        return (

                <HomeWrapper>
                <HomeLeft>
                    <img className='banner-img' alt='' src="//upload.jianshu.io/admin_banners/web_images/4318/60781ff21df1d1b03f5f8459e4a1983c009175a5.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" />
                    <Topic / >
                    <List/>
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <Writer / >
                </HomeRight>
                { this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>顶部</BackTop> : null}

            </HomeWrapper>


            )

    }
    componentDidMount() {
        this.props.changeHomeData();
        this.bindEvents();


    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.changeScrollTopShow);
    }

    bindEvents() {
        window.addEventListener('scroll', this.props.changeScrollTopShow);
    }

    // 不使用store的方法，不建议ui组件里面写太多业务逻辑
    // componentDidMount() {
    //     axios.get('/api/home.json').then((res) => {
    //         const result = res.data.data;
    //         const action = {
    //             type:'change_home_data',
    //             articleList:result.articleList,
    //             recommendList:result.recommendList,
    //             topicList:result.topicList
    //         }
    //         this.props.changeHomeData(action)

    //         console.log(res.data.data);
    //     })
    // }
}
const mapState = (state) => ({
    showScroll: state.getIn(['home', 'showScroll'])

})

const mapDispatchToProps = (dispatch) => ({
    changeHomeData(){
        const action  = actionCreators.getHomeInfo();
        dispatch(action)
    },
    changeScrollTopShow() {
        if (document.documentElement.scrollTop > 100) {
            dispatch(actionCreators.toggleTopShow(true))
        }else {
            dispatch(actionCreators.toggleTopShow(false))
        }
    }
})
export default connect(mapState,mapDispatchToProps)(Home)