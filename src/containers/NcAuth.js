import {useAppState} from "../Overmind/overmind";
import {NewsafeAuth} from "@newstackdev/iosdk/dist/Components/UnsidAuth";

const NcAuth = () => {
    return (
        <div>
            {
                useAppState().api?.auth?.user?.id ? <p>Hello</p> : NewsafeAuth
            }
        </div>
    )
}

export default NcAuth;