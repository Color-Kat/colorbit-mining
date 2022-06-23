import SecondaryButton from "../../elements/SecondaryButton";
import Button from "../../elements/Button";
import React from "react";
import CLink from "../../CLink";
import useRoute from "../../../hooks/useRoute";

export const StageControl: React.FC<{
    stage: number,
    setStage: React.Dispatch<React.SetStateAction<number>>,
    errors: any
}> = ({stage, setStage, errors}) => {
    const route = useRoute();

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

            {stage < 4
                ? <Button
                    onClick={nextStage}
                    className="h-9 sm:text-base font-medium xsm:px-6"
                >
                    {stage < 3 ? 'Далее' : 'Создать'}
                </Button>

                : (Object.keys(errors).length == 0
                        ? <CLink className="h-9 sm:text-base font-medium xsm:px-6 border-gray-500 rounded-md border" href={route('admin.parts.index')}>Готово</CLink>
                        : ''
                )

            }
        </div>
    );
}
