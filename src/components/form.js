import React, { useState } from "react"
import { useMediaQuery } from 'react-responsive';

import Select from 'react-select';
import FormItem from './formItem';

import arrow from '../assets/images/arrow.svg';

const Form = () => {
    const [values, setValues] = useState({ name: '', mobilePrefix: '', mobile: '', chess: '', day: '', month: '', year: '' }),
        [isNameValid, setIsNameValid] = useState(true),
        [isMobilePrefixValid, setIsMobilePrefixValid] = useState(true),
        [isMobileValid, setIsMobileValid] = useState(true),
        [isChessValid, setIsChessValid] = useState(true),
        [isDateValid, setDateValid] = useState(true),
        [isOfAge, setIsOfAge] = useState(true)
    ;

    const handleSubmit = e => {    
        e.preventDefault(); // prevent defaut to tests validation
        // name validation
        values.name.length  >= 3 ? setIsNameValid(true) : setIsNameValid(false)

        //  mobilePrefix validation
        values.mobilePrefix.length  > 0 ? setIsMobilePrefixValid(true) : setIsMobilePrefixValid(false)

        //  mobile validation
        values.mobile.length  === 9 &&  values.mobile.match(/^[0-9]+$/) ? setIsMobileValid(true) : setIsMobileValid(false)

        // chess validation 
        values.chess.length  > 0 ? setIsChessValid(true) : setIsChessValid(false)

        // date validation
        if( values.day > 0 && values.day < 32 && values.month.length > 0 && values.year >= 1920 && values.year <= 2020) {
            const date = new Date(values.year+'-'+values.month+'-'+values.day)

            date.getFullYear() == values.year && date.getMonth() + 1 == values.month && date.getDate() == values.day 
            ? setDateValid(true) 
            : setDateValid(false)
        } else {
            setDateValid(false);
        }

        new Date( Number(values.year) + 18, values.month-1, values.day) <= new Date() 
            ? setIsOfAge(true)
            : setIsOfAge(false)
    };

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    const handleSelectChange = (selectedOption, name) => {
        setValues({...values, [name.name]: selectedOption.value})
    }

    const customStylesForMonthsSelect = {
        container: () => ({
            position: 'relative',
            width:  isDesktop ? 135 : 53,
        }),
        control: () => ({
            border: '2px solid #DADAED',
        }),
        indicatorsContainer: () => ({
            position: 'absolute',
            width: 10,
            height: 5,
            borderTop: 'solid 5px #2F3030',
            borderLeft: 'solid 5px transparent',
            borderRight: 'solid 5px transparent',
            opacity: .25,
            top: '50%',
            right: 10,
            transform: 'translateY( -50%)'
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        valueContainer: () => ({
            padding: '0',
            height: 44,
        }),
        singleValue: () => ({
            padding: '12px 20px 15px 10px',
            fontSize: 16,
        }),
        input: () => ({
            opacity: 0,
        }),
        menu: (provided) => ({
            ...provided,
            top: 38,
            border: '2px solid #DADAED',
            borderRadius: 0, 
            boxShadow: 0,
        }),
        option: (provided) => ({
            ...provided,
            fontSize: 16,
        }),
        placeholder: () => ({
            fontSize: 16,
            padding: '12px 20px 15px 10px',
        }),
    },
    customStylesForcountryCodeSelect = {
        container: () => ({
            position: 'relative',
            width:  115,
        }),
        control: () => ({
            borderBottom: '2px solid #DADAED',
        }),
        indicatorsContainer: () => ({
            position: 'absolute',
            width: 10,
            height: 5,
            borderTop: 'solid 5px #2F3030',
            borderLeft: 'solid 5px transparent',
            borderRight: 'solid 5px transparent',
            opacity: .25,
            top: '50%',
            right: 10,
            transform: 'translateY(-50%)'
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        valueContainer: () => ({
            padding: 0,
            height: 36,
        }),
        singleValue: () => ({
            padding: '9px 15px 9px 10px',
            fontSize: 16,
        }),
        input: () => ({
            opacity: 0,
        }),
        menu: (provided) => ({
            ...provided,
            top: 28,
            border: '2px solid #DADAED',
            borderRadius: 0, 
            boxShadow: 0,
        }),
        option: (provided) => ({
            ...provided,
            fontSize: 16,
        }),
        placeholder: () => ({
            fontSize: 16,
            padding: '12px 20px 15px 10px',
        }),
    },
    isDesktop = useMediaQuery({ query: '(min-width: 992px)' }), 
    countryCodeOptions = [
        { value: 'pl', label: '+48 (PL)' },
        { value: 'usa', label: '+1 (USA)' },
        { value: 'uk', label: '+44 (UK)' },
    ], monthsOption = [
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    if(!isDesktop) {
        for(let i = 0 ; i < monthsOption.length ; i++) {
            let number = '';
            i < 9 ? number = '0' + (i+1): number = '' + (i+1)
            monthsOption[i].label = number;
        }
    }

    const errorMessage = <p className="form__error">Invalid data</p>,
         tooYoungError = <p className="form__error">You are too young</p>;

    return (
        <form className="form" onSubmit={ handleSubmit }>
            <FormItem
                labelName="Your name" 
                labelFor="name"
            >
                <div className="form__field-holder">
                    <input 
                        type="text" 
                        name="name"
                        onChange={ handleInputChange } 
                        className={ !isNameValid ? 'error' : '' } />

                    { !isNameValid ? errorMessage : ''}
                </div>
            </FormItem>
            <FormItem
                labelName="Mobile" 
                labelFor="mobile"
            >
                <div className="form__field-holder form__field-holder--select">
                    <Select 
                            name="mobilePrefix"
                            options={ countryCodeOptions }
                            // defaultValue={ countryCodeOptions[0] } 
                            styles={ customStylesForcountryCodeSelect }
                            onChange={ handleSelectChange }
                            className={ !isMobilePrefixValid ? 'error' : '' }
                            classNamePrefix="select"
                    />
                    { !isMobilePrefixValid ? errorMessage : ''}
                </div>
                <div className="form__field-holder">
                    <input 
                        type="tel" 
                        name="mobile" 
                        className={`form__input-mobile ${ !isMobileValid ? 'error' : ''} `} 
                        onChange={ handleInputChange } />
                    { !isMobileValid ? errorMessage : ''}
                </div>
            </FormItem>
            <FormItem
                labelName="Can you play chess?" 
                labelFor="chess"
            >
                <div className={`radio-holder ${ !isChessValid ? 'error' : '' } `}>
                    <input 
                        type="radio" 
                        name="chess" 
                        value="Yes" 
                        onChange={ handleInputChange } 
                        className={ !isChessValid ? 'error' : '' }/>
                    <p className="radio-holder__text">
                        Yes
                    </p>
                </div>
                <div className={`radio-holder ${ !isChessValid ? 'error' : '' } `}>
                    <input 
                        type="radio" 
                        name="chess" 
                        value="No" 
                        onChange={ handleInputChange } />
                    <p className="radio-holder__text">
                        No
                    </p>
                </div>
                { !isChessValid  ? errorMessage : ''}
            </FormItem>
            <FormItem
                labelName="Date of birth" 
                labelFor="date"
            >
                <div className="date-holder">
                    <input 
                        type="number" 
                        name="day" 
                        onChange={ handleInputChange } 
                        className={`with-border ${!isDateValid ? 'error' : ''} `} />
                    <div className="date-holder__separator"></div>
                    <Select name="month"
                            options={ monthsOption }
                            defaultValue={ !isDesktop ? monthsOption[0] : '' } 
                            styles={ customStylesForMonthsSelect }
                            onChange={ handleSelectChange }
                            className={ !isDateValid ? 'error' : '' }
                            classNamePrefix="select"
                            
                    />
                    <div className="date-holder__separator"></div>
                    <input 
                        type="number" 
                        name="year"
                        className={`form__year with-border ${!isDateValid ? 'error' : ''} `}
                        onChange={ handleInputChange }
                        />
                    { !isDateValid ? errorMessage : ''}
                    { !isOfAge && isDateValid ? tooYoungError : ''}
                </div>
            </FormItem>
            <div className="form__item">
                <div className="form__submit-holder">
                    <input className="form__submit" type="submit" value="Continue"/>
                    <div className="submit-holder__after">
                        <img src={ arrow } alt="arrow" />
                    </div>
                </div>
            </div>
        </form>
    );
} 

export default Form;