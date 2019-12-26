import * as React from 'react'

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
                            <div className="ui fluid large teal submit button" >Submit</div>
                        }
                    </div>
                   
                </div>
            </form>
         
        </div>
        )
    }
}