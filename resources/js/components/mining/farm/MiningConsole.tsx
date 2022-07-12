import React, {useRef} from "react";

// @ts-ignore
import Terminal from 'react-console-emulator';
import useTypedPage from "@hooks/useTypedPage";

export const MiningConsole: React.FC<{}> = React.memo(({}) => {
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
            fn: (...args: any[]) => args.join(' ') + '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
        },
        "mining": {
            description:
                "mining run all - Запустить майнинг на всех ригах.\n" +
                "mining run #rig-name - Запустить майнинг на риге по идентификатору.\n" +
                "mining stop all - Остановить майнинг на всех ригах.\n" +
                "mining stop #rig-name - остановить майнинг на риге по идентификатору.\n",
            fn: (...args: string[]) => {
                if (!terminal.current) return 'Ошибка выполнения команды.';
                if (args.length === 0) return 'Команда `mining` введена неверно.';
                if (args.length === 1) return 'Не указаны параметры команды.';

                setTimeout(() => {
                    if (terminal.current) {
                        if(args[0] == 'run') {
                            if (args[1] == 'all') terminal.current.pushToStdout('Майнинг запущен на всех ригах');
                            else if (args[1]) {
                                terminal.current.pushToStdout('Майнинг запущен на ригах: ' + args[1]);
                            }
                        } else if(args[0] == 'stop') {
                            if (args[1] == 'all') terminal.current.pushToStdout('Майнинг остановлен на всех ригах');
                            else if (args[1]) {
                                terminal.current.pushToStdout('Майнинг остановлен на ригах: ' + args[1]);
                            }
                        }
                    }
                }, 1500);

                if(args[0] == 'run') return 'Запускаем, подождите...';
                else return 'Останавливаем майнинг, подождите...';
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
            noDefaults

            className="h-96"
            contentClassName="overflow-scroll no-scrollbar sm:max-w-auto"
            contentStyle={{
                maxWidth: '90vw',
                // width: '100%'
            }}
            style={{
                overflowX: 'scroll',
                whiteSpace: 'pre'
            }}
        />
    );
});
