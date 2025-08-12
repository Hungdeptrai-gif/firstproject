import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        background: "#222",
        color: "#fff",
        padding: "20px 0",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Logo + slogan */}
        <h3 style={{ margin: "0 0 10px 0" }}>MyShop</h3>
        <p style={{ margin: "0 0 15px 0", fontSize: "14px" }}>
          Tạo sản phẩm theo cách của bạn
        </p>

        {/* Menu liên kết */}
        <nav style={{ marginBottom: "10px" }}>
          <Link to="/" style={linkStyle}>
            Trang chủ
          </Link>
          <Link to="/customize" style={linkStyle}>
            Tùy chỉnh
          </Link>
          <Link to="/cart" style={linkStyle}>
            Giỏ hàng
          </Link>
          <Link to="/order" style={linkStyle}>
            Đặt hàng
          </Link>
        </nav>

        {/* Copyright */}
        <p style={{ fontSize: "13px", margin: 0 }}>
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

const linkStyle = {
  color: "#fff",
  margin: "0 10px",
  textDecoration: "none",
  fontSize: "14px",
};

export default Footer;
