import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, GetStringKeys, Input, Textarea } from '../../common/FormControls/FormControls';
import {connect} from 'react-redux';
import style from './ProfileInfo.module.css';
import { ContactsType, ProfileType } from '../../../types/types';

type PropsType = {
  contacts: ContactsType
}
// : React.FC<PropsType>

type ProfileTypeKeys = GetStringKeys<ProfileType>;

const ProfileDetailsForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, contacts, error})=>{
    return(
      <div className={style.profileDetails}>
        <form onSubmit={handleSubmit}>
          
          {error && <div className={style.formSummaryError}>{error}</div>}
          <div>About me : </div>       
          {createField<ProfileTypeKeys>("I like pizza!","aboutMe", [], Textarea,{})}         
          <div>Looking for a job</div>
          {createField<ProfileTypeKeys>("","lookingForAJob", [], Input,{type:"checkbox"})}
          <div>Description</div>
          {createField<ProfileTypeKeys>("My professional skills","lookingForAJobDescription", [], Textarea)}
          {Object.keys(contacts).map(key => {
                    return <div key={key}>
                      <b>{key}</b>: 
                      {createField(key,"contacts."+key,[], Input)}
                    </div>
                  }                     
                  )}
          <div><button>Save</button></div>
      </form>
      </div>
    );
}
let ProfileDetailsFormRedux = reduxForm<ProfileType, PropsType>({form: 'profileEdit', destroyOnUnmount: false})(ProfileDetailsForm);

export default ProfileDetailsFormRedux;
