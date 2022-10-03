
import { useAppState } from "../overmind/overmind";
export const Home = () => {
    const state = useAppState();
    return <>
        {state.api?.auth?.user?.id ?
            <>
                <h1>Hello, {state.api.auth.user.username}</h1>
                Welcome to {state.config.settings.app.name}.<br />We hope you enjoy this service.
            </>
            : "please sign in"}
        
    </>;
};