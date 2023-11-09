import React from 'react';

type LayoutProps = {
    children: React.ReactNode
}
const Layout = ({children}: LayoutProps) => {
    return (
        <div className={"w-full h-full min-h-screen"}>
            {children}
        </div>
    );
};

export default Layout;