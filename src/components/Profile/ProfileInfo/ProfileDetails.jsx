import Preloader from '../../common/preloader/preloader';
import Contacts from './Contacts';
import style from './ProfileInfo.module.css';
const ProfileDetailsForm = (props)=>{
  if(!props.profile){
    return <Preloader></Preloader>
  }
    return(
        <div>
          <span>About me : {props.profile.aboutMe}</span>
          <div className={style.jobInfo}>         
                <span>{props.profile.lookingForAJob ? <div>Looking for a job<br/>Description: {props.profile.lookingForAJobDescription}</div>: ""}</span>
              </div>   
              <div className={style.contacts}>
                <div>Contacts</div>
                  {props.isOwner && <button onClick={props.goToEditMode}>Edit</button>}
                  {/* <div className={style.headerContact + " " + style.contact}><b>GitHub</b>: {props.profile.contacts.github}</div> */}
                  {Object.keys(props.profile.contacts).map(key => {
                    if(true)
                    return <Contacts key={key} contactTitle={key} ContactValue={props.profile.contacts[key]}/>
                  }                     
                  )}                  
              </div>  
      </div>
    );
}

export default ProfileDetailsForm;
