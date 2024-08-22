import React from 'react'

interface HeaderProps {
    pageName: string;
  }
  
const Header : React.FC<HeaderProps> = ({pageName}) => {

    return (
        <div className="header-wrapper">
            <h1>
                {pageName}
            </h1>
        </div>
    )
}

export default Header