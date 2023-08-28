import useTitle from './hooks/useTitle';
import { useLocation } from 'react-router-dom'
import './style/Missing404.css';

const Missing404 = () => {
    useTitle('404 Page Not Found Error');
    return (
        <div className ={"missingDiv"} >
            <div className={"missingNumber"}>404</div>
            <div className={"missingText"}>
                <b>{useLocation().pathname}</b> page not found
            </div>
        </div>
    );
};

export default Missing404;
