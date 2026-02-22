import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Edit2 } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [userId] = useState('#thi87ece67');

  // Form state for profile data
  const [profileData, setProfileData] = useState({
    fullName: 'Random Username',
    email: 'Randomuser00@gmail.com',
    expertise: 'Coder',
    gender: 'Male',
    phoneNumber: '+91 98765 43210',
    location: 'Green Villa, Whitehouse junction, State P.O',
    about: 'Event bio Event bio Event bio Event bio Event bio Event bio Event bio Event bio Event bio Event bio Event bio Event bio Event bio',
    // Institution details
    instituteName: 'College of Engineering, Optional',
    instituteType: 'Student',
    domain: 'Engineering',
    passoutYear: '2027',
    course: 'B-Tech',
    specialization: 'Computer Science',
    // Other preferences
    tshirtSize: 'Small - S',
    mealPreference: 'No preference'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save profile data to backend
    console.log('Profile updated:', profileData);
    setIsEditing(false);
    // Could add success notification here
  };

  const handleCopyUserId = () => {
    navigator.clipboard.writeText(userId);
    // Could add a toast notification here
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#0a1f1f] via-[#0d2626] to-[#0a1f1f] flex">
        <Header />
        {/* Left Sidebar Navigation */}
        <div className="w-60  lg:mt-24 lg:mt-28  p-6 hidden lg:block">
          {/* Go Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white mb-8 hover:text-[#00ff88] transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Go Back</span>
          </button>

          {/* Navigation Menu Card */}
          <div className="bg-[#0a1f1f] border-2 border-[#1a4d4d] rounded-2xl p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'account'
                  ? 'bg-[#00ff88] text-[#0a1f1f]'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a4d4d]'
                  }`}
              >
                Account
              </button>
              <button
                onClick={() => setActiveTab('myEvents')}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'myEvents'
                  ? 'bg-[#00ff88] text-[#0a1f1f]'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a4d4d]'
                  }`}
              >
                My Events
              </button>
              <button
                onClick={() => setActiveTab('profileCard')}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'profileCard'
                  ? 'bg-[#00ff88] text-[#0a1f1f]'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a4d4d]'
                  }`}
              >
                Profile Card
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 mt-24 lg:mt-14 lg:p-12 lg:mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-white text-4xl font-bold mb-2">Profile</h1>
            <p className="text-gray-400 text-sm">All your details are shown here</p>
          </div>

          {/* Profile Container */}
          <div className="bg-[#0d2f2f] border-2 border-[#1a4d4d] rounded-3xl p-8 lg:p-12 w-80 lg:w-full">
            {/* View Profile Header with User ID */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-[#00ff88]">
              <h2 className="text-white text-xl font-semibold">View Profile</h2>
              <button
                onClick={handleCopyUserId}
                className="flex items-center gap-2 bg-[#0a1f1f] border-2 border-[#00ff88] text-[#00ff88] px-4 py-2 rounded-lg hover:bg-[#1a4d4d] transition-all duration-300"
              >
                <span className="font-mono font-medium">{userId}</span>
                <Copy className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left: Profile Picture */}
              <div className="flex flex-col items-center">
                {/* Circular Profile Picture with Green Border */}
                <div className="relative mb-6">
                  <div className="w-40 h-40 rounded-full border-4 border-[#00ff88] overflow-hidden bg-gray-800">
                    <img
                      src="/event.png"
                      alt="Profile"
                      className="lg:w-full lg:h-full w-40 h-40 object-cover"
                    />
                  </div>
                </div>

                {/* Change Picture Button */}
                <button className="bg-gradient-to-r from-[#00ff88] to-[#00cc70] hover:from-[#00cc70] hover:to-[#00ff88] text-[#0a1f1f] font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                  Change picture
                </button>
              </div>

              {/* Right: User Information Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Full Name</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleInputChange}
                      className="flex-1 bg-transparent border-2 border-[#1a4d4d] text-white py-3 px-4 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-[#00ff88] hover:text-[#00cc70] transition-colors p-2"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Expertise and Gender Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Expertise</label>
                    <input
                      type="text"
                      name="expertise"
                      value={profileData.expertise}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-2 border-[#1a4d4d] text-white py-3 px-4 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Gender</label>
                    <select
                      name="gender"
                      value={profileData.gender}
                      onChange={handleInputChange}
                      className="w-full bg-[#0a1f1f] border-2 border-[#1a4d4d] text-white py-3 px-4 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300 cursor-pointer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Phone number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-2 border-[#1a4d4d] text-white py-3 px-4 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-2 border-[#1a4d4d] text-white py-3 px-4 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300"
                    required
                  />
                </div>

                {/* About */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">About</label>
                  <textarea
                    name="about"
                    value={profileData.about}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full bg-transparent border-2 border-[#1a4d4d] text-white py-3 px-4 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300 resize-none"
                    required
                  ></textarea>
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00ff88] to-[#00cc70] hover:from-[#00cc70] hover:to-[#00ff88] text-[#0a1f1f] font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00ff88]/50"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>

          {/* Institution Section */}
          <div className="bg-[#0d2f2f] border-2 border-[#1a4d4d] rounded-3xl p-8 lg:p-12 mt-8 w-80 lg:w-full ">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#00ff88]">
              <h2 className="text-white text-2xl font-semibold">Institution</h2>
              <button
                type="button"
                className="text-[#00ff88] hover:text-[#00cc70] transition-colors p-2"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            </div>

            {/* Institution Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Institute Name and Type */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Institute Name</label>
                  <input
                    type="text"
                    name="instituteName"
                    value={profileData.instituteName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-2 border-[#1a4d4d] text-white py-3 px-4 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Type</label>
                  <select
                    name="instituteType"
                    value={profileData.instituteType}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a1f1f] border-2 border-[#1a4d4d] text-white py-3 px-4 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300 cursor-pointer"
                  >
                    <option value="Student">Student</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Domain and Passout Year */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Domain</label>
                  <input
                    type="text"
                    name="domain"
                    value={profileData.domain}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-2 border-[#1a4d4d] text-white py-3 px-4 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Passout Year</label>
                  <input
                    type="text"
                    name="passoutYear"
                    value={profileData.passoutYear}
                    onChange={handleInputChange}
                    placeholder="2027"
                    className="w-full bg-transparent border-2 border-[#1a4d4d] text-white py-3 px-4 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Course and Specialization */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Course</label>
                  <input
                    type="text"
                    name="course"
                    value={profileData.course}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-2 border-[#1a4d4d] text-white py-3 px-4 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={profileData.specialization}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-2 border-[#1a4d4d] text-white py-3 px-4 rounded-xl focus:outline-none focus:border-[#00ff88] transition-all duration-300"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Others Section */}
          <div className="bg-[#0d2f2f] border-2 border-[#1a4d4d] rounded-3xl p-8 lg:p-12 mt-8 w-80 lg:w-full ">
            {/* Section Header */}
            <div className="mb-6 pb-4 border-b-2 border-[#00ff88]">
              <h2 className="text-white text-2xl font-semibold">Others</h2>
            </div>

            {/* Others Form */}
            <form onSubmit={handleSubmit} className="space-y-8 items-center justify-center">
              {/* T-Shirt Size */}
              <div>
                <label className="text-gray-400 text-sm mb-4 block">T - Shirt size</label>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {['Small - S', 'Medium - M', 'Large - L', 'Extra Large - XL', 'Extra Extra Large - XXL', 'Extra Large - XXXL'].map((size) => (
                    <label
                      key={size}
                      className={`flex items-center gap-2 px-6 py-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${profileData.tshirtSize === size
                        ? 'border-[#00ff88] bg-[#00ff88]/10'
                        : 'border-[#1a4d4d] hover:border-[#00ff88]/50'
                        }`}
                    >
                      <input
                        type="radio"
                        name="tshirtSize"
                        value={size}
                        checked={profileData.tshirtSize === size}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-[#00ff88]"
                      />
                      <span className="text-white text-sm">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Meal Info */}
              <div>
                <label className="text-gray-400 text-sm mb-4 block">Meal info</label>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['Veg', 'Non- Veg', 'No preference'].map((meal) => (
                    <label
                      key={meal}
                      className={`flex items-center gap-2 px-8 py-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${profileData.mealPreference === meal
                        ? 'border-[#00ff88] bg-[#00ff88]/10'
                        : 'border-[#1a4d4d] hover:border-[#00ff88]/50'
                        }`}
                    >
                      <input
                        type="radio"
                        name="mealPreference"
                        value={meal}
                        checked={profileData.mealPreference === meal}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-[#00ff88]"
                      />
                      <span className="text-white text-sm">{meal}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00ff88] to-[#00cc70] hover:from-[#00cc70] hover:to-[#00ff88] text-[#0a1f1f] font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00ff88]/50"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Account Section */}
          <div className="bg-[#0d2f2f] border-2 border-[#1a4d4d] rounded-3xl p-8 lg:p-12 mt-8  w-80 lg:w-full ">
            {/* Section Header */}
            <div className="mb-6 pb-4 border-b-2 border-[#00ff88]">
              <h2 className="text-white text-2xl font-semibold">Account</h2>
            </div>

            {/* Account Content */}
            <div className="space-y-8">
              {/* Email Section */}
              <div className="flex items-center justify-between pb-6 border-b border-[#1a4d4d]">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Email</label>
                  <p className="text-white lg:text-xl text-sm font-medium">{profileData.email}</p>
                </div>
                <button
                  type="button"
                  className="bg-transparent border-2 text-sm lg:text-lg border-[#1a4d4d] text-white lg:px-8 px-6 lg:py-3 py-2 rounded-lg hover:border-[#00ff88] hover:text-[#00ff88] transition-all duration-300"
                >
                  Change
                </button>
              </div>

              {/* Sign Out Section */}
              <div className="flex items-center justify-between pb-6 border-b border-[#1a4d4d]">
                <div>
                  <h3 className="text-white lg:text-lg text-sm font-medium mb-1 mr-1"> You signed in as {profileData.fullName}</h3>
                  <p className="text-gray-400 text-sm">Devices or Browsers where you are signed in</p>
                </div>
                <button
                  type="button"
                  className="bg-gradient-to-r text-sm lg:text-lg from-[#00ff88] to-[#00cc70] hover:from-[#00cc70] hover:to-[#00ff88] text-[#0a1f1f] font-bold lg:px-8 px-6 lg:py-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Sign out
                </button>
              </div>

              {/* Delete Account Section */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white text-lg font-medium mb-1">Delete account</h3>
                  <p className="text-gray-400 text-sm">Permanently delete your account and data</p>
                </div>
                <button
                  type="button"
                  className="bg-red-600 text-sm lg:text-lg hover:bg-red-700 text-white font-bold lg:px-8 px-6 lg:py-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation (Sidebar) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0d2626] border-t border-[#1a4d4d] p-4">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab('account')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'account'
                ? 'bg-[#00ff88] text-[#0a1f1f]'
                : 'text-gray-400'
                }`}
            >
              Account
            </button>
            <button
              onClick={() => setActiveTab('myEvents')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'myEvents'
                ? 'bg-[#00ff88] text-[#0a1f1f]'
                : 'text-gray-400'
                }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('profileCard')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'profileCard'
                ? 'bg-[#00ff88] text-[#0a1f1f]'
                : 'text-gray-400'
                }`}
            >
              Card
            </button>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Profile;