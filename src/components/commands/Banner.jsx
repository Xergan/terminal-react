import React from "react";

export default function Banner() {
  const asciiArt = `                                                            
                                                            
 /$$   /$$  /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$$ 
|  $$ /$$/ /$$__  $$ /$$__  $$ /$$__  $$ |____  $$| $$__  $$
 \\  $$$$/ | $$$$$$$$| $$  \\__/| $$  \\ $$  /$$$$$$$| $$  \\ $$
  >$$  $$ | $$_____/| $$      | $$  | $$ /$$__  $$| $$  | $$
 /$$/\\  $$|  $$$$$$$| $$      |  $$$$$$$|  $$$$$$$| $$  | $$
|__/  \\__/ \\_______/|__/       \\____  $$ \\_______/|__/  |__/
                               /$$  \\ $$                    
                              |  $$$$$$/                    
                               \\______/                      
                                                            `;

  return (
    <div className="w-full">
      <p>Welcome to the terminal! Type 'help' to get started.</p>
      <pre>{asciiArt}</pre>
    </div>
  );
}
