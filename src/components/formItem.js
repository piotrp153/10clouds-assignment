import React from "react"

const FormItem = ({labelName, labelFor, children}) => (
    <div className="form__item">
        <label htmlFor={ labelFor }>
            { labelName }
        </label>
        <div className="item__row">
            { children }
        </div>
    </div>
)

export default FormItem