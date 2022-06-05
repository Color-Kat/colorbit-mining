import React, { PropsWithChildren } from 'react';
import GPULogo from '@assets/GPU-logo.png';
import JetAuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo';

export default React.memo(function AuthenticationCard({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className="w-full flex flex-col sm:justify-center items-center px-5">
      <div className="app-bg-dark rounded-full h-32 md:h-48 w-32 md:w-48 flex justify-center items-center translate-y-10 shadow-l">
        {/*<JetAuthenticationCardLogo />*/}
          <img src={GPULogo} className="" alt=""/>
      </div>

      <div className="font-play w-full sm:max-w-xl px-6 py-4 app-bg-dark text-app shadow-lg overflow-hidden rounded-lg">
        {children}
      </div>
    </div>
  );
});
