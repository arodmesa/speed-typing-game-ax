export function Switch({checked_btn, handleRadioBtn, label1,label2,label3, handleDif}){
    return(
        <div className="switch-toggle">
            <div className={'div_radio_btn '+(checked_btn[0]?'checked':'')} onClick={()=>{handleRadioBtn(0);handleDif(label1)}}>
                <h3 className="h3_option"> {label1}</h3>
            </div>
            <div className={'div_radio_btn '+(checked_btn[1]?'checked':'')} onClick={()=>{handleRadioBtn(1);handleDif(label2)}}>
                <h3 className="h3_option"> {label2}</h3>
            </div>
            <div className={'div_radio_btn '+(checked_btn[2]?'checked':'')} onClick={()=>{handleRadioBtn(2);handleDif(label3)}}>
                <h3 className="h3_option"> {label3}</h3>
            </div>    
        </div>
    );
}