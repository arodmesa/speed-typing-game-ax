export function TextDisplay({user_text, handleChange, ref_TextArea, ref_Div_Text}){
    return(
        <div className='div_textos' ref={ref_Div_Text}>
            <textarea className='tx_texto' ref={ref_TextArea} onChange={handleChange} value={user_text} placeholder='Type the frase here' readOnly></textarea>
        </div>
    );    
}