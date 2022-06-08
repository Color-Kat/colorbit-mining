import React, {PropsWithChildren, ReactNode} from "react";

export interface IPage<P = {}> extends React.FC<PropsWithChildren<P>>
{
    layout?: (page: React.ReactNode) => JSX.Element;
}
