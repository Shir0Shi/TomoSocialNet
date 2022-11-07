import React from 'react';
import {connect} from 'react-redux';
import { follow, unfollow, requestUsers, FilterType } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/preloader/preloader';
import {getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getUsersFilter } from '../../redux/usersSelectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';


type MapStatePropsType = {
    currentPage:number, 
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number, 
    users: Array<UserType>,
    followingInProgress: Array<number>,
    filter: FilterType
}
type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void, 
    unfollow: (userId:number)=>void,
    follow:  (userId:number)=>void  
}
type OwnPropsType = {

}

type Props = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersAPI extends React.Component<Props>
{
    componentDidMount(){
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize, {term: "", friend: null});
    }
    onPageChanged = (p:number) =>{
        const {pageSize, filter} = this.props;
        this.props.requestUsers(p, pageSize, filter);
    }
    onFilterChanged = (filter:FilterType)=>{
        
        const {pageSize} = this.props;      
        this.props.requestUsers(1, pageSize, filter);
    }
    render(){
        
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount} 
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            users={this.props.users}
            onPageChanged={this.onPageChanged}
            onFilterChanged={this.onFilterChanged}
            follow = {this.props.follow}
            unfollow = {this.props.unfollow}
            followingInProgress = {this.props.followingInProgress}/>
            </>;
    }
}

let mapStateToProps =(state:AppStateType):MapStatePropsType=>{
    return{
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}


export default  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
    (mapStateToProps, 
    { follow, unfollow, requestUsers })(UsersAPI);