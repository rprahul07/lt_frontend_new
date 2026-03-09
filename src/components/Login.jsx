import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, googleAuth, forgotPassword } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [forgotEmail, setForgotEmail] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showForgot, setShowForgot] = useState(false);
    const [forgotSuccess, setForgotSuccess] = useState('');

    const handleGoogleLogin = async () => {
        // To enable Google login, integrate Firebase:
        //   const result = await signInWithPopup(auth, googleProvider);
        //   const idToken = await result.user.getIdToken();
        //   await googleAuth(idToken);
        //   navigate('/');
        setError('Google OAuth not configured yet. Please use email/password.');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login({ email, password });
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed. Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        setForgotSuccess('');
        setLoading(true);
        try {
            await forgotPassword(forgotEmail);
            setForgotSuccess('Reset link sent! Check your inbox.');
        } catch (err) {
            setError(err.message || 'Failed to send reset email.');
        } finally {
            setLoading(false);
        }
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

                    {/* Error Banner */}
                    {error && (
                        <div className="mb-4 px-4 py-3 bg-red-900/40 border border-red-500/50 rounded-xl text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Forgot Password View */}
                    {showForgot ? (
                        <div>
                            <h3 className="text-white text-xl font-semibold mb-4">Reset Password</h3>
                            {forgotSuccess ? (
                                <p className="text-[#00ff88] text-sm mb-4">{forgotSuccess}</p>
                            ) : (
                                <form onSubmit={handleForgotPassword} className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="Your registered email"
                                        value={forgotEmail}
                                        onChange={(e) => setForgotEmail(e.target.value)}
                                        className="w-full bg-transparent border-2 border-[#1a4d4d] text-white placeholder-gray-500 py-3 px-6 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-[#00ff88] to-[#00cc70] hover:from-[#00cc70] hover:to-[#00ff88] text-[#0a1f1f] font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-60"
                                    >
                                        {loading ? 'Sending…' : 'Send Reset Link'}
                                    </button>
                                </form>
                            )}
                            <button
                                onClick={() => { setShowForgot(false); setError(''); setForgotSuccess(''); }}
                                className="mt-4 text-[#00ff88] text-sm hover:underline"
                            >
                                ← Back to Login
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Google Login */}
                            <div className="space-y-4 mb-6">
                                <button
                                    id="google-login-btn"
                                    onClick={handleGoogleLogin}
                                    disabled={loading}
                                    className="w-full bg-transparent border-2 border-[#1a4d4d] hover:border-[#00ff88] text-white py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#1a4d4d]/30 backdrop-blur-sm disabled:opacity-60"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                                        <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                                        <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                                        <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                                    </svg>
                                    <span className="font-medium">Continue with Google</span>
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
                                        id="login-email"
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
                                        id="login-password"
                                        type="password"
                                        placeholder="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-transparent border-2 border-[#1a4d4d] text-white placeholder-gray-500 py-3 px-6 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300 backdrop-blur-sm"
                                        required
                                    />
                                </div>

                                {/* Forgot password link */}
                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={() => { setShowForgot(true); setError(''); }}
                                        className="text-[#00ff88] text-sm hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    id="login-submit-btn"
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-[#00ff88] to-[#00cc70] hover:from-[#00cc70] hover:to-[#00ff88] text-[#0a1f1f] font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00ff88]/50 disabled:opacity-60 disabled:scale-100"
                                >
                                    {loading ? 'Logging in…' : 'Log In'}
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
                        </>
                    )}
                </div>
            </div>

            {/* Right Panel - Branding & Background */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#0d3333] to-[#0a1f1f] items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-80">
                    <img className="w-full h-full object-cover" src="/login-bg.png" alt="Tropical background" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f1f]/70 via-transparent to-[#0a1f1f]/70"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-12">
                    <div className="mb-auto mt-20">
                        <img src="/logo1.png" alt="Lenient Tree Logo" className="w-48 h-48 object-contain drop-shadow-2xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-12 w-full max-w-lg">
                        <button className="bg-transparent border-2 border-[#00ff88] text-white py-3 px-4 rounded-2xl text-sm font-medium hover:bg-[#00ff88]/10 transition-all duration-300 backdrop-blur-sm">Personal event calender</button>
                        <button className="bg-transparent border-2 border-[#00ff88] text-white py-3 px-4 rounded-2xl text-sm font-medium hover:bg-[#00ff88]/10 transition-all duration-300 backdrop-blur-sm">Short portfolios</button>
                        <button className="bg-transparent border-2 border-[#00ff88] text-white py-3 px-4 rounded-2xl text-sm font-medium hover:bg-[#00ff88]/10 transition-all duration-300 backdrop-blur-sm">Certificate gallery</button>
                        <button className="bg-transparent border-2 border-[#00ff88] text-white py-3 px-4 rounded-2xl text-sm font-medium hover:bg-[#00ff88]/10 transition-all duration-300 backdrop-blur-sm">Upcoming event info</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
