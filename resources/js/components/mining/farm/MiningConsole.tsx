import React, {useRef} from "react";

// @ts-ignore
import Terminal from 'react-console-emulator';
import useTypedPage from "@hooks/useTypedPage";

export const MiningConsole: React.FC<{}> = React.memo(({}) => {
    const userName = useTypedPage().props.user.name;
    const terminal = useRef<any>();

    const commands = {
        help: {
            description: 'Выводит список команд.',
            fn: () => {
                const helpArray = [];
                for(let command in commands) {
                    helpArray.push(command + ' - ' + (commands as any)[command].description);
                }

                return helpArray.join("\n");
            }
        },
        clear: {
            description: 'Очистить окно консоли.',
            fn: () => {
                if(!terminal.current) return 'Ошибка выполнения команды';

                terminal.current.clearStdout();
                console.log(terminal.current)
            }
        },
        echo: {
            description: 'Выводит переданную строку',
            usage: 'echo <string>',
            fn: (...args: any[]) => args.join(' ')
        },
        wait: {
            description: 'Выводит сообщение через 1.5сек',
            fn: () => {
                if(!terminal.current) return 'Ошибка выполнения команды';
                setTimeout(() => {
                    if(terminal.current) terminal.current.pushToStdout('Майнинг запущен')
                }, 1500);

                return 'Запускаем, подождите...'
            }
        }
    }

    return (
        <Terminal
            ref={terminal} // Assign ref to the terminal here

            commands={commands}
            welcomeMessage={'Добро пожаловать в Color console'}
            promptLabel={userName+'@mining:~$'}
            errorText="Команда `[command]` не найдена! Введите `help` для вывода списка команд"
            styleEchoBack={'fullInherit'}
            noDefaults

            className="h-96 no-scrollbar overflow-scroll"
            style={{
                overflowX: 'scroll'
            }}
            inputTextStyle={{
                // width: 'max-content'
            }}
        />
    );
});
