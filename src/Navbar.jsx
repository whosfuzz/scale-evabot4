import { ThemeToggle } from "./ThemeToggle";
import { useUser } from "./context/UserContext.jsx";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { user, login, logout } = useUser();

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logoContainer}>
        <img src="/eba.png" alt="Evabot Logo" style={styles.logoImage} />
        <span style={styles.logoText}>Evabot</span>
      </Link>

      <div style={styles.rightSection}>
        <ThemeToggle />

        {user ? (
          <>
           <button
              className="btn"
              onClick={() => {
                const confirmed = window.confirm("Are you sure you want to sign out?");
                if (confirmed) {
                  logout();
                }
              }}
            >
              {user.name}
            </button>
          </>
        ) : (
          <button className="btn" onClick={login}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    borderBottom: "1px solid var(--text-color)",
    backgroundColor: "var(--bg-color)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    textDecoration: "none",
    color: "var(--text-color)",
  },

  logoImage: {
    width: "42px",
    height: "42px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  logoText: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "var(--text-color)",
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },

  userName: {
    fontWeight: "600",
    fontSize: "1rem",
    color: "var(--text-color)",
    whiteSpace: "nowrap",
  },

  loginBtn: {
    padding: "0.5rem 1.2rem",
    cursor: "pointer",
    backgroundColor: "var(--accent-color)",
    color: "var(--bg-color)",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "0.95rem",
    whiteSpace: "nowrap",
  },
};
