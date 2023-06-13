import {Link, useLocation } from "react-router-dom";

const CustomLink = ({children, to}) => {
    const location = useLocation();
    const match = location.pathname === to;

    return (
        <Link
            to={to}
            style={{
                backgroundColor: match ? 'rgba(255, 221, 185, 0.2)' : 'transparent',
                borderRadius: '20px',
                fontWeight: '300',
                fontSize: '24px',
                lineHeight: '29px',
                color: '#fdfbfb',

                margin: '0',
                padding: '6px 0 4px 15px',
                textDecoration: 'none',
            }}
        >
            {children}
        </Link>
    )
}

export {CustomLink}