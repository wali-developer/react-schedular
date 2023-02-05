
import { Audio, LineWave, Puff } from 'react-loader-spinner'

const CustomeLoader = () => {

    return (
        <div
            className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen loader_background"
            style={{
                'zIndex': '999'
            }}
        >
            <Puff
                height="130"
                width="130"
                color={'#52B467'}
                ariaLabel='loading'
            />
        </div>
    );
};

export default CustomeLoader;
