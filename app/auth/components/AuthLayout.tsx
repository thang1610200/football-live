
interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
    children
}) => {
    return (
        <div className="relative h-screen bg-[url('/images/bg.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-inherit lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" className="h-20" alt="Logo" />
                </nav>
                {children}
            </div>
        </div>          
    );
}

export default AuthLayout;