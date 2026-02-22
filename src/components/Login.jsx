import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogleLogin = () => {
        // TODO: Implement Google OAuth
        console.log('Google login clicked');
    };

    const handleGithubLogin = () => {
        // TODO: Implement GitHub OAuth
        console.log('GitHub login clicked');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // TODO: Implement login logic
        console.log('Login attempted with:', email, password);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Login Form */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#0a1f1f] via-[#0d2626] to-[#0a1f1f] flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Branding */}
                    <div className="mb-8">
                        <h1 className="text-[#00ff88] text-2xl font-bold mb-2">Lenient Tree</h1>
                        <h2 className="text-white text-4xl font-bold mb-3">Welcome to LenientTree</h2>
                        <p className="text-gray-400 text-sm">Discover events, track peers, solve awareness gap</p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-4 mb-6">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full bg-transparent border-2 border-[#1a4d4d] hover:border-[#00ff88] text-white py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#1a4d4d]/30 backdrop-blur-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                                <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                                <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                                <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                            </svg>
                            <span className="font-medium">Continue with Google</span>
                        </button>

                        <button
                            onClick={handleGithubLogin}
                            className="w-full bg-transparent border-2 border-[#1a4d4d] hover:border-[#00ff88] text-white py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#1a4d4d]/30 backdrop-blur-sm"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Continue with Github</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-gray-600"></div>
                        <span className="text-gray-400 text-sm">or</span>
                        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-gray-600 to-gray-600"></div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="lenienttreeuser@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-2 border-[#1a4d4d] text-white placeholder-gray-500 py-3 px-6 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300 backdrop-blur-sm"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-2 border-[#1a4d4d] text-white placeholder-gray-500 py-3 px-6 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300 backdrop-blur-sm"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#00ff88] to-[#00cc70] hover:from-[#00cc70] hover:to-[#00ff88] text-[#0a1f1f] font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00ff88]/50"
                        >
                            Log In
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-gray-400 text-sm mt-6">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/signup')}
                            className="text-[#00ff88] hover:underline font-medium"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>

            {/* Right Panel - Branding & Background */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#0d3333] to-[#0a1f1f] items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-80">
                    <img className="w-full h-full object-cover" src="/login-bg.png" alt="Tropical background" />
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f1f]/70 via-transparent to-[#0a1f1f]/70"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-12">
                    {/* Logo */}
                    <div className="mb-auto mt-20">
                        <img
                            src="/logo1.png"
                            alt="Lenient Tree Logo"
                            className="w-48 h-48 object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* Feature Buttons */}
                    <div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-lg">
                        <button className="bg-transparent border-2 border-[#00ff88] text-white py-3 px-4 rounded-2xl text-sm font-medium hover:bg-[#00ff88]/10 transition-all duration-300 backdrop-blur-sm">
                            Personal event calender
                        </button>
                        <button className="bg-transparent border-2 border-[#00ff88] text-white py-3 px-4 rounded-2xl text-sm font-medium hover:bg-[#00ff88]/10 transition-all duration-300 backdrop-blur-sm">
                            Short portfolios
                        </button>
                        <button className="bg-transparent border-2 border-[#00ff88] text-white py-3 px-4 rounded-2xl text-sm font-medium hover:bg-[#00ff88]/10 transition-all duration-300 backdrop-blur-sm">
                            Certificate gallery
                        </button>
                        <button className="bg-transparent border-2 border-[#00ff88] text-white py-3 px-4 rounded-2xl text-sm font-medium hover:bg-[#00ff88]/10 transition-all duration-300 backdrop-blur-sm">
                            Upcoming event info
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
