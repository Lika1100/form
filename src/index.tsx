import * as React from  'react';
import {render} from 'react-dom';
import "./index.scss";
//import styles from "./styles.module.scss"
const styles = require("./styles.module.scss")
import App from "./App"

type Props = {
    children: React.ReactNode;
}

const Button: React.FC<Props> = ({children}: Props) =>{
    return <div onClick={() => console.log("hello")}>{children}</div>
}

//<div className='title'>React приложение <Button>Hello</Button><div className={styles.img}></div> </div>


render(<App />, document.getElementById('root')); 

if (module.hot) {
    module.hot.accept()
}