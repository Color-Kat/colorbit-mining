import SecondaryButton from "../../elements/SecondaryButton";
import Button from "../../elements/Button";
import React from "react";

export const StageControl: React.FC<{stage: number, setStage:  React.Dispatch<React.SetStateAction<number>>}> = ({stage, setStage}) => {
    const nextStage = () => {
        setStage((prev: number) => {
            if (prev < 4) return prev + 1;
            else return prev;
        });
    }

    const prevStage = () => {
        setStage((prev: number) => {
            if (prev > 1) return prev - 1;
            else return prev;
        })
    }

    return (
        <div className="admin-stages w-full flex justify-between mt-7">
            {stage > 1
                ? <SecondaryButton onClick={prevStage} className="h-9 sm:text-base font-medium xsm:px-6">
                    Назад
                </SecondaryButton>
                : <div/>
            }

            {stage < 4 && <Button
                    onClick={nextStage}
                    className="h-9 sm:text-base font-medium xsm:px-6"
                >
                    {stage < 3 ? 'Далее' : 'Создать'}
                </Button>
            }
        </div>
    );
}
