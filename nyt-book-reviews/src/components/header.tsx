import React from 'react'

interface HeaderProps {
    pageName: string;
  }
  
const Header : React.FC<HeaderProps> = ({pageName}) => {

    return (
        <div className="main-header-wrapper">
            <h1 className="main-header">
                {pageName}
            </h1>
        </div>
    )
}

export default Header