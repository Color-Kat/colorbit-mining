import React from "react";

export interface IPage<P = {}> extends React.FC<P> {
    layout?: (page: React.ReactNode) => JSX.Element;
}
