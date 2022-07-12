import React from "react";

// @ts-ignore
import Terminal from 'react-console-emulator';
import useTypedPage from "@hooks/useTypedPage";

export const MiningConsole: React.FC<{}> = React.memo(({}) => {
    const userName = useTypedPage().props.user.name;

    const commands = {
        echo: {
            description: 'Выводит переданную строку',
            usage: 'echo <string>',
            fn: (...args: any[]) => args.join(' ')
        }
    }

    return (
        <Terminal
            commands={commands}
            welcomeMessage={'Добро пожаловать в Color console'}
            promptLabel={userName+'@mining:~$'}
            className="h-96 no-scrollbar"
            style={{
                overflowX: 'scroll'
            }}
            inputStyle={{
                width: 'max-content'
            }}
        />
    );
});
