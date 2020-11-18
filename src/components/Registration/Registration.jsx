import React, {Component} from 'react'

const userDataTemplate = {
    name: "",
    gender: '',
    creditCard: '',
    loyaltyProgram: false,
    loyaltyCode: 'None',
    registrationTime: null,
    id: null
}


export default class Registration extends Component {
    constructor() {
        super();
        this.state = {...userDataTemplate};
        this.confirmRef = React.createRef();
        this.btn = React.createRef();
        this.cardInput = React.createRef();
    }

    

    newUser = (e) => {
        const input = e.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;
        const name = input.name;

        this.setState({
            [name]: value
        })
    }
    //validating card type and format valud to 4x4
    creditCardFormating = (e) => {
        const input = e.target;
        let ccNumString = input.value;
        ccNumString = ccNumString.replace(/[^0-9]/g, '');
        let typeCheck = ccNumString.substring(0, 2),
        cType='',
        block1='',
        block2='',
        block3='',
        block4='',
        formatted='';

        if  (typeCheck.length === 2) {
            typeCheck = parseInt(typeCheck);
            if (typeCheck >= 40 && typeCheck <= 49) {
                cType='Visa';
            }
            else if (typeCheck >= 51 && typeCheck <= 55) {
                cType='Master-Card';
            }
            else if ((typeCheck >= 60 && typeCheck <= 62) || (typeCheck === 64) || (typeCheck === 65)) {
                cType='Discover';
            }
            else if (typeCheck === 34 || typeCheck === 37) {
                cType='American-Express';
            }
            else {
                cType='Invalid';
            }
            if (cType !== 'Invalid') {
                input.parentNode.classList.add(cType)
            }
        }

        if (!cType) {
            input.parentNode.classList.remove('Visa', 'Master-Card', 'Discover', 'American-Express', 'Invalid')
        }
        
        block1 = ccNumString.substring(0, 4);
        if (block1.length === 4) {
            block1=block1 + ' ';
        }

        if (cType === 'Visa' || cType === 'Master-Card' || cType === 'Discover') {
            block2 = ccNumString.substring(4, 8);
            if (block2.length === 4) {
                block2=block2 + ' ';
            }
            block3 = ccNumString.substring(8, 12);
            if (block3.length ===4) {
                block3=block3 + ' ';
            }
            block4 = ccNumString.substring(12, 16);
        }
        else if (cType === 'American-Express') {
            block2 =  ccNumString.substring(4, 10);
            if (block2.length === 6) {
                block2=block2 + ' ';
            }
            block3 =  ccNumString.substring(10, 15);
            block4='';
        }
        else if (cType === 'Invalid') {
            block1 =  typeCheck;
            block2='';
            block3='';
            block4='';
            input.parentNode.classList.add('invalid-card')
            setTimeout(() => {input.parentNode.classList.remove('invalid-card')}, 40000)
        }

        formatted = block1 + block2 + block3 + block4;
        
        this.setState({
            creditCard: formatted
        })
    }
    //"name" input resctrict for digits
    nameInputValidation = (e) => {
        const input = e.target;
        if (input.value.match(/\d/)) {
            input.parentNode.classList.add('invalid-name')
            setTimeout(() => {input.parentNode.classList.remove('invalid-name')}, 1500)
        }
        const value = input.value.replace(/[^A-zА-яё]/g, '');
        const name = input.name;

        this.setState({
            [name]: value
        })
    }
    //add new user 
    setUser = (e) => {
        e.preventDefault();
        this.submitMessage();
        e.target.reset();
        this.props.addUser(this.state);
        this.setState(userDataTemplate);
    }
    //clear code input after triggering checkbox
    refreshLoyaltyCode = () => {
        const empty = '';
        this.setState({
            loyaltyCode: empty
        })
    }

    //fomr successfully submitting alert
    submitMessage = () => {
        const btn = this.btn.current;
        const confirm = this.confirmRef.current;
        const cardIpnut = this.cardInput.current;
        btn.parentNode.classList.add('slide', 'fade')
        cardIpnut.classList.remove('Visa', 'Master-Card', 'Discover', 'American-Express')
        setTimeout(()=>{confirm.style='opacity: 1'}, 300)
        setTimeout(()=>{confirm.style='opacity: 0'}, 1800)
        setTimeout(()=>{btn.parentNode.classList.remove('slide')}, 2000)
        setTimeout(()=>{btn.parentNode.classList.remove('fade')}, 13000)
    }

    render() {
        return(
            <>
            <div className="Registration">
                <div className="Registration-Picture">
                    <span className='Registration-Message'>BE PART OF OUR AWESOME TEAM AND HAVE FUN WITH US</span>
                    <img className='Registration-Man' src="./reg_man.png" alt="welcome"/>
                </div>
                <form className='Registration-Form' onSubmit={this.setUser}>
                    <ul className='Registration-Wrapper'>
                        <li className='Registration-Field'>
                            <input className='Registration-Input' type="text" name='name' id='name' value={this.state.name} onChange={this.nameInputValidation} required/>
                            <label className='Registration-Label' htmlFor='name'><span className='Registration-Title'>FULL NAME</span></label>
                        </li>
                        <li className='Registration-Field'> 
                            <select className='Registration-Input' type="text" name='gender' id='gender' value={this.state.gender} onChange={this.newUser} required>
                                <option className='Registration-Option' disabled value=""></option>
                                <option className='Registration-Option' value="Male">Male</option>
                                <option className='Registration-Option' value="Female">Female</option>
                            </select>
                            <label className='Registration-Label' htmlFor='gender'><span className='Registration-Title'>GENDER</span></label>
                        </li>
                        <li className='Registration-Field' ref={this.cardInput}>
                            <input className='Registration-Input' type="tel" name='creditCard' id='creditCard' value={this.state.creditCard} onChange={this.creditCardFormating}  required />
                            <label className='Registration-Label' htmlFor='creditCard'><span className='Registration-Title'>CREDIT CARD</span></label>
                        </li>
                        <li className='Registration-Field Registration-Field_loyalty'>
                            <input className='Registration-Input_loyalty' type="checkbox" name='loyaltyProgram' id='loyaltyProgram' value={this.state.loyaltyProgram} onChange={this.newUser} onClick={this.refreshLoyaltyCode} />
                            <label className='Registration-Label' htmlFor='loyaltyProgram'><span>LOYALTY CODE?</span></label>
                        </li>
                        <li className={this.state.loyaltyProgram ? 'Registration-Promo Registration-Promo_active' : 'Registration-Promo'}>
                            <input placeholder='CODE' className='Registration-Input' type="text" name='loyaltyCode' value={this.state.loyaltyCode} onChange={this.newUser} maxLength='9' required={this.state.loyaltyProgram ? true : false}></input>
                        </li>
                        <button className='Registration-Button' ref={this.btn}>ADD A NEW MEMBER</button>
                    </ul>
                        <div className="Registration-Confirmation" ref={this.confirmRef}>NEW BROTHERINO CONFIRMED</div>
                </form>
            </div>
            </>
        )
    }
}