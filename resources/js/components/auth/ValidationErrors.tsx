import React from 'react';
import {usePage} from '@inertiajs/inertia-react';

export default React.memo(function ValidationErrors({ className }: {
    className?: string;
}) {
    const {props} = usePage();
    const {errors} = props;
    const hasErrors = Object.keys(errors).length > 0;

    if (!hasErrors) {
        return null;
    }

    return (
        <div className={className}>
            <div className="font-medium text-red-600">

            </div>

            <ul className="mt-3 list-disc list-inside text-sm text-red-500">
                {Object.keys(errors).map(key => (
                    <li key={key}>{errors[key]}</li>
                ))}
            </ul>
        </div>
    );
});
