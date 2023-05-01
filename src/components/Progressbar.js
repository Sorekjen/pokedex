import React from 'react'
  
const ProgressBar = ({bgcolor,progress,height, label}) => {
     
    const Parentdiv = {
        height: height,
        width: '250px',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: 5
      }
      
      const Childdiv = {
        height: '100%',
        width: `${(progress/255)*100}%`, //255 fordi det er max stat (   says the internet :)   )
        backgroundColor: bgcolor,
        borderRadius:40,
        textAlign: 'left',
        paddingLeft: 10,
        
      }

    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
      <p>{label}</p>
      </div>
    </div>
    )
}
  
export default ProgressBar;