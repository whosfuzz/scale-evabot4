import React from 'react';
import { Link } from 'react-router-dom';
import { account } from "../appwrite.js";
import { useUser } from '../context/UserContext.jsx';

const Home = () => {
    const { user, logout, login } = useUser();

    // Render Logged Out View
    if (!user) {
        return (
            <div className="home-container logged-in">
                <style>{inlineStyles}</style>
                <section className="hero-section logged-out">
                    <h1 className="hero-title">
                        It's <span className="brand-highlight">Eva</span> Everyday
                    </h1>
                    <p className="hero-subtitle">
                        All your messages in one place. Think you can do better? <span className="brand-highlight"><b>Show me</b></span>
                    </p>    
                    <button className="discord-login-btn" onClick={login} aria-label="Login with Discord">
                        <svg className="discord-icon" viewBox="0 0 127.14 96.36" aria-hidden="true">
                            <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a74.37,74.37,0,0,0,6.72-10.93,68.6,68.6,0,0,1-10.64-5.12c.91-.67,1.81-1.37,2.65-2.1a75.22,75.22,0,0,0,72.6,0c.84.73,1.74,1.43,2.65,2.1a68.86,68.86,0,0,1-10.64,5.12,74.74,74.74,0,0,0,6.72,10.93,105.73,105.73,0,0,0,31-18.83C129.07,50.12,123.2,27.31,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" fill="#fff"/>
                        </svg>
                        Login with Discord
                    </button>
                </section>
                <main className="dashboard-content">
                    <div className="quicklinks-grid">
                        <Link to="/messages" className="quicklink-card">
                            <span className="quicklink-icon">📋</span>
                            <div className="quicklink-text">
                                <h3>View Messages</h3>
                                <p>Browse and manage your saved messages</p>
                            </div>
                        </Link>
                        <Link to="/messages/create" className="quicklink-card">
                            <span className="quicklink-icon">✍️</span>
                            <div className="quicklink-text">
                                <h3>Create Message</h3>
                                <p>Specify a folder and a message to add to Evabot</p>
                            </div>
                        </Link>
                        <Link to="/dailyfolders" className="quicklink-card">
                            <span className="quicklink-icon">📂</span>
                            <div className="quicklink-text">
                                <h3>View Daily Folders</h3>
                                <p>Browse and manage your automated daily folders</p>
                            </div>
                        </Link>
                        <Link to="/dailyfolders/create" className="quicklink-card">
                            <span className="quicklink-icon">📅</span>
                            <div className="quicklink-text">
                                <h3>Add Daily Folder</h3>
                                <p>Specify a folder and a day for automated daily folders</p>
                            </div>
                        </Link>
                         <Link to="/users" className="quicklink-card">
                            <span className="quicklink-icon">👥</span>
                            <div className="quicklink-text">
                                <h3>View Users</h3>
                                <p>See all discord users collaborating to make Evabot happen</p>
                            </div>
                        </Link>
                        <Link to="/privacy" className="quicklink-card">
                            <span className="quicklink-icon">📜</span>
                            <div className="quicklink-text">
                                <h3>Privacy & Terms</h3>
                                <p>Read our usage rules and learn how we protect your information</p>
                            </div>
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    // Render Logged In View
    return (
        <div className="home-container logged-in">
            <style>{inlineStyles}</style>
            <header className="dashboard-header">
                <h1>Welcome <span className="user-highlight">{user.name}</span>!</h1>
            </header>
            <main className="dashboard-content">
                <div className="quicklinks-grid">
                    <Link to="/messages" className="quicklink-card">
                        <span className="quicklink-icon">📋</span>
                        <div className="quicklink-text">
                            <h3>View Messages</h3>
                            <p>Browse and manage your saved messages</p>
                        </div>
                    </Link>
                    <Link to="/messages/create" className="quicklink-card">
                        <span className="quicklink-icon">✍️</span>
                        <div className="quicklink-text">
                            <h3>Create Message</h3>
                            <p>Specify a folder and a message to add to Evabot</p>
                        </div>
                    </Link>
                    <Link to="/dailyfolders" className="quicklink-card">
                        <span className="quicklink-icon">📂</span>
                        <div className="quicklink-text">
                            <h3>View Daily Folders</h3>
                            <p>Browse and manage your automated daily folders</p>
                        </div>
                    </Link>
                    <Link to="/dailyfolders/create" className="quicklink-card">
                        <span className="quicklink-icon">📅</span>
                        <div className="quicklink-text">
                            <h3>Add Daily Folder</h3>
                            <p>Specify a folder and a day for automated daily folders</p>
                        </div>
                    </Link>
                    <Link to="/users" className="quicklink-card">
                        <span className="quicklink-icon">👥</span>
                        <div className="quicklink-text">
                            <h3>View Users</h3>
                            <p>See all discord users collaborating to make Evabot happen</p>
                        </div>
                    </Link>
                    <Link to="/privacy" className="quicklink-card">
                        <span className="quicklink-icon">📜</span>
                        <div className="quicklink-text">
                            <h3>Privacy Policy</h3>
                            <p>Read our usage rules and learn how we protect your information</p>
                        </div>
                    </Link>
                </div>
            </main>

            <div className="logout-footer">
                <button className="logout-btn" onClick={logout}>Sign Out</button>
            </div>
        </div>
    );
};

// Filtered and clean CSS string matching only active JSX tags
const inlineStyles = `

.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  box-sizing: border-box;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}

.logged-out {
  justify-content: center;
  text-align: center;
  gap: 60px;
}

.hero-section {
  max-width: 700px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 20px 0;
  letter-spacing: -1px;
}

.brand-highlight {
  color: var(--discord-blurple);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0 0 40px 0;
}

.discord-login-btn {
  background-color: var(--discord-blurple);
  color: #fff;
  border: none;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.discord-login-btn:hover {
  background-color: var(--discord-blurple-hover);
}

.discord-login-btn:active {
  transform: scale(0.98);
}

.discord-icon {
  width: 24px;
  height: 24px;
}

.logged-in {
  justify-content: flex-start;
  gap: 30px;
}

.dashboard-header {
  border-bottom: 1px solid var(--card-bg);
  padding-bottom: 15px;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 2.25rem;
}

.user-highlight {
  color: var(--discord-blurple);
}

.dashboard-content {
  flex-grow: 1;
}

.quicklinks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.quicklink-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  background-color: var(--card-bg);
  padding: 24px;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  border: 1px solid light-dark(rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.05));
}

.quicklink-card:hover {
  transform: translateY(-2px);
  border-color: var(--discord-blurple);
  box-shadow: 0 6px 20px light-dark(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.25));
}

.quicklink-icon {
  font-size: 2rem;
  line-height: 1;
}


-Beautified CSS-
 
.quicklink-text h3 {
	margin: 0 0 6px 0;
	font-size: 1.25rem;
}

.quicklink-text p {
	margin: 0;
	font-size: 0.95rem;
	color: var(--text-muted);
	line-height: 1.4;
}

.logout-footer {
	display: flex;
	justify-content: flex-start;
}

.logout-btn {
	background-color: transparent;
	color: var(--text-muted);
	border: 1px solid var(--text-muted);
	padding: 10px 24px;
	border-radius: 6px;
	cursor: pointer;
	font-weight: 600;
	font-size: 0.95rem;
}

.logout-btn:hover {
	background-color: var(--danger-red);
	color: #fff;
	border-color: var(--danger-red);
}

@media (max-width: 768px) {
	.home-container {
		padding: 30px 16px;
	}

	.logged-out {
		gap: 40px;
	}

	.hero-title {
		font-size: 2.5rem;
	}

	.dashboard-header h1 {
		font-size: 1.75rem;
	}
}

@media (max-width: 480px) {
	.quicklink-card {
		flex-direction: column;
		gap: 12px;
	}

	.logout-footer {
		justify-content: center;
	}

	.logout-btn {
		width: 100%;
		padding: 12px;
	}
}

`;
export default Home;