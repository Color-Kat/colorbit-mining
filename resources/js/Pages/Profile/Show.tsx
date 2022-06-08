import React from 'react';
import UpdateProfileInformationForm from '@components/profile/forms/UpdateProfileInformationForm';
import useTypedPage from '@hooks/useTypedPage';
import {Session} from '@/types/types';
import UpdatePasswordForm from "@components/profile/forms/UpdatePasswordForm";
import LogoutOtherBrowserSessions from "@components/profile/forms/LogoutOtherBrowserSessionsForm";
import DeleteUserForm from "../../components/profile/forms/DeleteUserForm";

interface Props {
    sessions: Session[];
    confirmsTwoFactorAuthentication: boolean;
}

export default React.memo(function Show({
     sessions,
     confirmsTwoFactorAuthentication,
 }: Props) {
    const page = useTypedPage();

    return (
        <div>
            <div className="max-w-7xl mx-auto py-10 ">
                <div>
                    <UpdateProfileInformationForm user={page.props.user}/>
                </div>

                <div className="mt-10 sm:mt-0">
                    <UpdatePasswordForm />
                </div>

                <div className="mt-10 sm:mt-0">
                  <LogoutOtherBrowserSessions sessions={sessions} />
                </div>


                <div className="mt-10 sm:mt-0">
                  <DeleteUserForm />
                </div>
            </div>
        </div>
    );
});
