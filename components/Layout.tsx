import React from "react"
import styles from "../styles/Layout.module.css"
import Meta from "./Meta"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <Meta />
      <header>
        <h1 className={styles.title}>boatsout ⛵</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>©sysout</footer>
    </div>
  )
}

export default Layout
