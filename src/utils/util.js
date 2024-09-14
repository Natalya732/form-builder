export const handleNumericInputKeyDown = (event) => { 
    let key = event.key; 
   
    if ( 
      key === "Backspace" || 
      key === "Tab" || 
      key === "Delete" || 
      key.toLowerCase() === "arrowleft" || 
      key.toLowerCase() === "arrowright" || 
      key.toLowerCase() === "arrowup" || 
      key.toLowerCase() === "arrowdown" || 
      (event.ctrlKey && (key == "v" || key == "V")) || 
      (event.metaKey && (key == "v" || key == "V")) 
    ) 
      return; 
   
    if (!/[0-9]/.test(key)) { 
      event.returnValue = false; 
   
      if (event.preventDefault) event.preventDefault(); 
    } 
  };

  export const capitilizeString = (str) => {
    if(!str) return;
    return str.split(" ").map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(" ");
  }