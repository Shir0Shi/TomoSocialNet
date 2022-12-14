import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { ResponseType } from "../api/api";
import { usersAPI } from "../api/usersAPI";
import { PhotosType, UserType } from "../types/types";
import { objectSelectionChanges } from "../utils/helper";
import { AppStateType, BaseThunkType, InferActionsType } from "./reduxStore";

const InitialState = {
    users:[] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of users id
    filter: {
        term: '',
        friend: null as null | boolean
    }
};


const usersReducer = (state = InitialState, action: ActionTypes):InitialStateType =>{
    switch(action.type){
        case 'SN/USERS/FOLLOW':{
            return{
                ...state,
                users: objectSelectionChanges(state.users, action.userId, "id", {followed: true})       
            }
        }
        case 'SN/USERS/UNFOLLOW':{
            return{
                ...state,
                users: objectSelectionChanges(state.users, action.userId, "id", {followed: false})              
            }
        }
        case 'SN/USERS/SET_USERS':{
            return{ ...state, users: action.users}
        }
        case 'SN/USERS/SET_CURRENT_PAGE':{
            return{ ...state, currentPage: action.currentPage}
        }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':{
            return{ ...state, totalUsersCount: action.totalUsersCount}
        }
        case 'SN/USERS/TOGGLE_IS_FETCHING':{
            return{ ...state, isFetching: action.isFetching}
        }
        case 'SN/USERS/TOGGLE_IN_FOLLOWING_PROGRESS':{
            return {...state, followingInProgress: action.isFetching ? 
                [...state.followingInProgress, action.userId] :
                state.followingInProgress.filter((id:number)=>id!=action.userId)}
        }
        case 'SN/USERS/SET_FILTER':{
            return {
                ...state, filter: action.payload
            }
        }
        default: return state;
    }    
    
}

export const actions = {
    followSuccess:(userId:number)=>({ type: 'SN/USERS/FOLLOW', userId }as const),

    unfollowSuccess:(userId:number)=>({ type: 'SN/USERS/UNFOLLOW', userId }as const),
    
    setUsers:(users:Array<UserType>) =>({ type:'SN/USERS/SET_USERS', users }as const),

    setFilter:(filter: FilterType) =>({ type:'SN/USERS/SET_FILTER', payload: filter }as const),
    
    setCurrentPage: (currentPage:number) =>({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage}as const),
    
    setTotalUsersCount: (totalUsersCount:number) =>({type: 'SN/USERS/SET_TOTAL_USERS_COUNT', totalUsersCount}as const),
    
    setIsFetching: (isFetching:boolean) =>({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching}as const),
    
    toggleFollowingProgress: (followingProgress:boolean, userId:number) => 
        ({type:'SN/USERS/TOGGLE_IN_FOLLOWING_PROGRESS', isFetching: followingProgress, userId}as const)
    
}


export const requestUsers =(currentPage:number,pageSize:number, filter: FilterType): ThunkType => async (dispatch, getState) => {
    dispatch(actions.setIsFetching(true)); 
        
    dispatch(actions.setFilter(filter))
    let result = await usersAPI.getUsers(currentPage, pageSize, filter)   
    dispatch(actions.setUsers(result.items));
    dispatch(actions.setIsFetching(false));
    dispatch(actions.setTotalUsersCount(result.totalCount));
    dispatch(actions.setCurrentPage(currentPage));
}

const followUnfollowFlow = async(
    dispatch: DispatchType, 
    userId:number, 
    actionMethod: (userId: number) => Promise<ResponseType>,
    actionCreator: (userId: number) => ActionTypes
    )=>{
    dispatch(actions.toggleFollowingProgress(true,userId));
        let result = await actionMethod(userId);
        if(result.resultCode === 0)
        {
            dispatch(actionCreator(userId));
            dispatch(actions.toggleFollowingProgress(false,userId));
        }
}
export const follow =(userId:number): ThunkType => async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI),actions.followSuccess);
}

export const unfollow =(userId:number): ThunkType=> async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI),actions.unfollowSuccess);
}

export type InitialStateType = typeof InitialState;
export type FilterType = typeof InitialState.filter;
type ActionTypes = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionTypes>;
//type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;
type DispatchType = Dispatch<ActionTypes>;

export default usersReducer;