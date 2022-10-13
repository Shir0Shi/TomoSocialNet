import React from "react";
import { Navigate } from "react-router-dom";
import {connect} from "react-redux";
import { AppStateType } from "../../redux/reduxStore";
const mapStateToPropsForRedirect = (state: AppStateType)=>({
        isAuth: state.auth.isAuth
      } as Props);
type Props = {
    isAuth: boolean
}
type DispatchPropsType = {};
type IntrinsicAttributes = {};

export function withAuthRedirect<WCP extends IntrinsicAttributes>(Component: React.ComponentType<WCP>){
    
    const RedirectComponent: React.FC<Props & DispatchPropsType> = (props) =>{
        let {isAuth, ...restProps} = props;
        
        if(!isAuth) return <Navigate to={"/login"}/>;
        
        return <Component {...restProps as WCP} />
        
    }
    
    let ConnectedRedirectComponent = connect<Props, DispatchPropsType, WCP, AppStateType>(
        mapStateToPropsForRedirect,{})
        (RedirectComponent);
    return ConnectedRedirectComponent;
}