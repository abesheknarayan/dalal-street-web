import * as React from 'react';
import {ForgotPasswordRequest} from "../../../proto_build/actions/ForgotPassword_pb";
import { DalalActionService } from "../../../proto_build/DalalMessage_pb_service";

export interface FormState{
   email:string,
   disabled:boolean,
   error:string|null

}

export class ForgotPasswordForm extends React.Component<any,FormState>{

    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            disabled:false,
            error:null
        }

    }
    handleSubmit = async () =>{
       this.setState({
         disabled:true
       })

       const forgotpasswordrequest=new ForgotPasswordRequest();
       forgotpasswordrequest.setEmail(this.state.email);

       try {
        const resp = await DalalActionService.forgotpassword(forgotpasswordrequest);
        // this.props.loginSuccessHandler(resp);
    } catch (e) {
        console.log(e);
        this.setState({
            error: e.isGrpcError ? "Unable to reach server. Please check your internet connection." : e.statusMessage,
        });
    }

    this.setState({
        disabled: false,
    });

    }

    handleEmailChange = (event: React.FormEvent<HTMLInputElement>) =>{
        this.setState({
            email: event.currentTarget.value,
        });
    }
    render()
    {
        return(

            <div>
            <form className="ui large form">
                <div className="ui attatched stacked secondary segment">
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input type="text" name="email" placeholder="E-mail address" onChange={this.handleEmailChange} value={this.state.email} />
                        </div>
                        {this.state.disabled ?
                            <div className="ui fluid large teal submit disabled button">Submit</div> :
                            <div className="ui fluid large teal submit button" onClick={this.handleSubmit}>Submit</div>
                        }
                    </div>
                   
                </div>
            </form>
         
        </div>
        )
    }
}