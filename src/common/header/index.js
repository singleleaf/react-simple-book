import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from './store'
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import {
    HeaderWraper,
    Logo,
    Nav,
    NavItem,
    SearchWrapper,
    NavSearch,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem,
    Addition,
    Button
} from './style'



class Header extends Component {

     getListArea() {
        const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props;
        const newList = list.toJS();
        const pageList = [];

        if (newList.length) {
        {/*刚开始的时候newlist是空*/}
            for (let i = (page - 1) * 10; i < page * 10; i++) {
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }

        if (focused || mouseIn) {
            return (
                <SearchInfo
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch
                            onClick={() => handleChangePage(page, totalPage,this.spinIcon)}
                        >
                            <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        }else {
            return null;
        }
    }
    render() {
        const { focused, handleInputFocus, handleInputBlur, list, login, logout } = this.props;
       return (


        <HeaderWraper>
        <Link to='/'>
                    <Logo/>
                </Link>
            <Nav>
                <NavItem className='left active' >首页</NavItem>
                <NavItem className='left' >下载APP</NavItem>

                 {
                    login ? <NavItem  onClick={logout} className='right'>退出</NavItem> :<Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
                 }
                <SearchWrapper>
                    <CSSTransition

                        in={this.props.focused}
                        timeout={200}
                        classNames='slide'
                    >
                    <NavSearch
                    className={ this.props.focused?'focused' : ''}
                    onFocus={() => handleInputFocus(list)}
                    onBlur={ this.props.handleInputBlur}
                     >
                     </NavSearch>
                     </CSSTransition>
                    <i  className={this.props.focused?'iconfont focused zoom' : 'iconfont zoom'} >
                            &#xe614;
                        </i>
                        {this.getListArea()}
                </SearchWrapper>

            </Nav>
            <Addition>

                        <Link to='/write'>
                        <Button className='writting'>
                            <i className="iconfont">&#xe615;</i>
                            写文章
                        </Button>
                    </Link>

                    <Button className='reg'>注册</Button>
                </Addition>
            </HeaderWraper>
    )
    }

}


const mapStateToProps = (state) => {
    return {
        //focused: state.header.focused 把store里的focused映射到组件
        focused: state.get('header').get('focused'), //等价于state.getIn(['header','focused'])
        list:state.getIn(['header','list']),
        page:state.getIn(['header','page']),
        totalPage: state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        login:state.getIn(['login','login'])

    }
}
const mapDispathToProps = (dispatch) => {
    return {
        handleInputFocus(list) {
            (list.size === 0) && dispatch(actionCreators.getList());
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur())
        },
        handleMouseEnter() {

            dispatch(actionCreators.mouseEnter())
       },
       handleMouseLeave(){

        dispatch(actionCreators.mouseLeave())

       },
       handleChangePage(page,totalPage,spin) {
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
            if (originAngle) {
                originAngle = parseInt(originAngle, 10);
            }else {
                originAngle = 0;
            }
            spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
        // console.log(page,totalPage);
        if(page <totalPage){
            dispatch(actionCreators.changePage(page+1))
        }else{
            dispatch(actionCreators.changePage(1))
        }



       },
       logout() {
            dispatch(loginActionCreators.logout())
        }
    }


}


export default connect(mapStateToProps, mapDispathToProps)(Header);