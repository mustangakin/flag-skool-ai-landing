import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="flagSkoolCookieConsent"
      style={{
        background: "hsl(var(--card))",
        borderTop: "1px solid hsl(var(--border))",
        padding: "1rem",
        alignItems: "center",
      }}
      buttonStyle={{
        background: "hsl(var(--primary))",
        color: "hsl(var(--primary-foreground))",
        fontSize: "14px",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        fontWeight: "600",
        cursor: "pointer",
        border: "none",
      }}
      declineButtonStyle={{
        background: "transparent",
        color: "hsl(var(--muted-foreground))",
        fontSize: "14px",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        border: "1px solid hsl(var(--border))",
        cursor: "pointer",
        marginRight: "0.5rem",
      }}
      expires={365}
      onAccept={() => {
        // Optional: Track analytics, enable features, etc.
        console.log("Cookies accepted");
      }}
      onDecline={() => {
        // Optional: Disable analytics, etc.
        console.log("Cookies declined");
      }}
    >
      <span style={{ fontSize: "14px", color: "hsl(var(--foreground))" }}>
        We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
        By clicking "Accept All", you consent to our use of cookies.{" "}
        <Link 
          to="/privacy" 
          style={{ 
            color: "hsl(var(--primary))", 
            textDecoration: "underline",
            textUnderlineOffset: "2px"
          }}
        >
          Learn more
        </Link>
      </span>
    </CookieConsent>
  );
};

export default CookieBanner;

