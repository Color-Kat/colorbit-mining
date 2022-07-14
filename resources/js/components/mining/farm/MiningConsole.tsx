import React, {useRef} from "react";

// @ts-ignore
import Terminal from 'react-console-emulator';
import useTypedPage from "@hooks/useTypedPage";
import {Response} from "../../../types/Response";
import useRoute from "../../../hooks/useRoute";

export const MiningConsole: React.FC<{}> = React.memo(({}) => {
    const route = useRoute();
    const userName = useTypedPage().props.user.name;
    const terminal = useRef<any>();

    const commands = {
        help: {
            description: 'help - Выводит список команд.',
            fn: () => {
                const helpArray = [];
                for (let command in commands) {
                    helpArray.push((commands as any)[command].description);
                }

                return helpArray.join("\n");
            }
        },
        clear: {
            description: 'clear - Очистить окно консоли.',
            fn: () => {
                if (!terminal.current) return 'Ошибка выполнения команды';

                terminal.current.clearStdout();
                console.log(terminal.current)
            }
        },
        echo: {
            description: 'echo - Выводит переданную строку',
            usage: 'echo <string>',
            fn: (...args: any[]) => args.join(' ')
        },
        m: {
            description:
                        "mining status - получить подробную информацию о всех ригах.\n" +
                        "mining status #rig-1 - получить подробную информацию о риге #rig-1.\n" +
                        "mining run all - запустить майнинг на всех ригах.\n" +
                        "mining run #rig-1 - запустить майнинг на риге #rig-1.\n" +
                        "mining stop all - остановить майнинг на всех ригах.\n" +
                        "mining stop #rig-1 - остановить майнинг на риге #rig-1.\n",
            fn: (...args: string[]) => {
                const action = args[0];

                if(!action) return "Команда `mining` ожидала дополнительные параметры";

                // setTimeout(() => {
                    window.axios.post<any, Response<string>>(route('mining.console'), {
                        action,
                        payload: args.slice(1,args.length)
                    }).then(res => {
                        console.log(res)
                        terminal.current.pushToStdout(res.data);
                    });
                // }, 500); // Add delay to make serious process

                return 'Запрос выполняется, подождите...';
            }
        }
    }

    return (
        <Terminal
            ref={terminal} // Assign ref to the terminal here

            commands={commands}
            welcomeMessage={"Добро пожаловать в color-console. \n" +
            "Введите `help` для вывода списка команд.\n" +
            "   ______      __           ____  _ __ \n" +
            "  / ____/___  / /___  _____/ __ )(_) /_\n" +
            " / /   / __ \\/ / __ \\/ ___/ __  / / __/\n" +
            "/ /___/ /_/ / / /_/ / /  / /_/ / / /_  \n" +
            "\\____/\\____/_/\\____/_/  /_____/_/\\__/\n "}
            promptLabel={userName + '@mining:~$'}
            errorText={"Команда `[command]` не найдена!\nВведите `help` для вывода списка команд"}
            styleEchoBack={'fullInherit'}
            autoFocus
            noDefaults

            className="w-full h-full"
            contentClassName="overflow-scroll no-scrollbar"
            contentStyle={{
                // maxWidth: '90vw',
                // width: '100vw'
            }}
            style={{
                overflowX: 'scroll',
                whiteSpace: 'pre'
            }}
        />
    );
});
